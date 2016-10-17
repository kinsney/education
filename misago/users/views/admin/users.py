from django.contrib import messages
from django.contrib.auth import get_user_model, update_session_auth_hash
from django.db import transaction
from django.http import JsonResponse
from django.shortcuts import redirect
from django.utils.translation import ugettext_lazy as _

from misago.admin.auth import start_admin_session
from misago.admin.views import generic
from misago.categories.models import Category
from misago.conf import settings
from misago.core.mail import mail_users
from misago.core.pgutils import batch_update
from misago.threads.models import Thread

from ...avatars.dynamic import set_avatar as set_dynamic_avatar
from ...forms.admin import BanUsersForm, EditUserForm, NewUserForm, SearchUsersForm, StaffFlagUserFormFactory
from ...models import ACTIVATION_REQUIRED_NONE, Ban, User
from ...models.ban import BAN_EMAIL, BAN_IP, BAN_USERNAME
from ...signatures import set_user_signature


class UserAdmin(generic.AdminBaseMixin):
    root_link = 'misago:admin:users:accounts:index'
    templates_dir = 'misago/admin/users'

    def get_model(self):
        return get_user_model()

    def create_form_type(self, request, target):
        if request.user.is_superuser:
            add_staff_field = request.user.pk != target.pk
        else:
            add_staff_field = False

        return StaffFlagUserFormFactory(
            self.Form, target, add_staff_field=add_staff_field)


class UsersList(UserAdmin, generic.ListView):
    items_per_page = 24
    ordering = (
        ('-id', _("From newest")),
        ('id', _("From oldest")),
        ('slug', _("A to z")),
        ('-slug', _("Z to a")),
        ('posts', _("Biggest posters")),
        ('-posts', _("Smallest posters")),
    )
    selection_label = _('With users: 0')
    empty_selection_label = _('Select users')
    mass_actions = [
        {
            'action': 'activate',
            'name': _("Activate accounts"),
            'icon': 'fa fa-check-square-o',
        },
        {
            'action': 'ban',
            'name': _("Ban users"),
            'icon': 'fa fa-lock',
        },
        {
            'action': 'delete_accounts',
            'name': _("Delete accounts"),
            'icon': 'fa fa-times-circle',
            'confirmation': _("Are you sure you want "
                              "to delete selected users?"),
        },
        {
            'action': 'delete_all',
            'name': _("Delete all"),
            'icon': 'fa fa-eraser',
            'confirmation': _("Are you sure you want to delete selected "
                              "users? This will also delete all content "
                              "associated with their accounts."),
            'is_atomic': False,
        }
    ]

    def get_queryset(self):
        qs = super(UsersList, self).get_queryset()
        return qs.select_related('rank')

    def get_search_form(self, request):
        return SearchUsersForm

    def action_activate(self, request, users):
        inactive_users = []
        for user in users:
            if user.requires_activation:
                inactive_users.append(user)

        if not inactive_users:
            message = _("You have to select inactive users.")
            raise generic.MassActionError(message)
        else:
            activated_users_pks = [u.pk for u in inactive_users]
            queryset = User.objects.filter(pk__in=activated_users_pks)
            queryset.update(requires_activation=ACTIVATION_REQUIRED_NONE)

            mail_subject = _("Your account on %(forum_name)s "
                             "forums has been activated")
            subject_formats = {'forum_name': settings.forum_name}
            mail_subject = mail_subject % subject_formats

            mail_subject = mail_subject
            mail_users(request, inactive_users, mail_subject,
                       'misago/emails/activation/by_admin')

            message = _("Selected users accounts have been activated.")
            messages.success(request, message)

    def action_ban(self, request, users):
        users = users.order_by('slug')
        for user in users:
            if user.is_superuser:
                message = _("%(user)s is super admin and can't be banned.")
                mesage = message % {'user': user.username}
                raise generic.MassActionError(mesage)

        form = BanUsersForm()
        if 'finalize' in request.POST:
            form = BanUsersForm(request.POST)
            if form.is_valid():
                cleaned_data = form.cleaned_data
                banned_values = []

                ban_kwargs = {
                    'user_message': cleaned_data.get('user_message'),
                    'staff_message': cleaned_data.get('staff_message'),
                    'expires_on': cleaned_data.get('expires_on')
                }

                for user in users:
                    for ban in cleaned_data['ban_type']:
                        if ban == 'usernames':
                            check_type = BAN_USERNAME
                            banned_value = user.username.lower()

                        if ban == 'emails':
                            check_type = BAN_EMAIL
                            banned_value = user.email.lower()

                        if ban == 'domains':
                            check_type = BAN_EMAIL
                            banned_value = user.email.lower()
                            at_pos = banned_value.find('@')
                            banned_value = '*%s' % banned_value[at_pos:]

                        if ban == 'ip':
                            check_type = BAN_IP
                            banned_value = user.joined_from_ip

                        if ban in ('ip_first', 'ip_two'):
                            check_type = BAN_IP

                            if ':' in user.joined_from_ip:
                                ip_separator = ':'
                            if '.' in user.joined_from_ip:
                                ip_separator = '.'

                            bits = user.joined_from_ip.split(ip_separator)
                            if ban == 'ip_first':
                                formats = (bits[0], ip_separator)
                            if ban == 'ip_two':
                                formats = (
                                    bits[0], ip_separator,
                                    bits[1], ip_separator
                                )
                            banned_value = '%s*' % (''.join(formats))

                        if banned_value not in banned_values:
                            ban_kwargs.update({
                                'check_type': check_type,
                                'banned_value': banned_value
                            })
                            Ban.objects.create(**ban_kwargs)
                            banned_values.append(banned_value)


                Ban.objects.invalidate_cache()
                message = _("Selected users have been banned.")
                messages.success(request, message)
                return None

        return self.render(
            request, template='misago/admin/users/ban.html', context={
                'users': users,
                'form': form,
            })

    def action_delete_accounts(self, request, users):
        for user in users:
            if user.is_staff or user.is_superuser:
                message = _("%(user)s is admin and can't be deleted.")
                mesage = message % {'user': user.username}
                raise generic.MassActionError(mesage)

        for user in users:
            user.delete()

        message = _("Selected users have been deleted.")
        messages.success(request, message)

    def action_delete_all(self, request, users):
        return self.render(
            request, template='misago/admin/users/delete.html', context={
                'users': users,
            })

        for user in users:
            if user.is_staff or user.is_superuser:
                message = _("%(user)s is admin and can't be deleted.")
                mesage = message % {'user': user.username}
                raise generic.MassActionError(mesage)

        for user in users:
            user.delete(delete_content=True)

        message = _("Selected users and their content has been deleted.")
        messages.success(request, message)


class NewUser(UserAdmin, generic.ModelFormView):
    Form = NewUserForm
    template = 'new.html'
    message_submit = _('New user "%(user)s" has been registered.')

    def handle_form(self, form, request, target):
        User = get_user_model()
        new_user = User.objects.create_user(
            form.cleaned_data['username'],
            form.cleaned_data['email'],
            form.cleaned_data['new_password'],
            title=form.cleaned_data['title'],
            rank=form.cleaned_data.get('rank'),
            joined_from_ip=request.user_ip,
            set_default_avatar=True
        )

        if form.cleaned_data.get('staff_level'):
            new_user.staff_level = form.cleaned_data['staff_level']

        if form.cleaned_data.get('roles'):
            new_user.roles.add(*form.cleaned_data['roles'])

        new_user.update_acl_key()
        new_user.save()

        messages.success(
            request, self.message_submit % {'user': target.username})
        return redirect('misago:admin:users:accounts:edit', pk=new_user.pk)


class EditUser(UserAdmin, generic.ModelFormView):
    Form = EditUserForm
    template = 'edit.html'
    message_submit = _('User "%(user)s" has been edited.')

    def real_dispatch(self, request, target):
        target.old_username = target.username
        target.old_is_avatar_locked = target.is_avatar_locked
        return super(EditUser, self).real_dispatch(request, target)

    def handle_form(self, form, request, target):
        target.username = target.old_username

        if target.username != form.cleaned_data.get('username'):
            target.set_username(form.cleaned_data.get('username'),
                                changed_by=request.user)

        if form.cleaned_data.get('new_password'):
            target.set_password(form.cleaned_data['new_password'])

            if target.pk == request.user.pk:
                start_admin_session(request, target)
                update_session_auth_hash(request, target)

        if form.cleaned_data.get('email'):
            target.set_email(form.cleaned_data['email'])
            if target.pk == request.user.pk:
                start_admin_session(request, target)

        if form.cleaned_data.get('is_avatar_locked'):
            if not target.old_is_avatar_locked:
                set_dynamic_avatar(target)

        if 'staff_level' in form.cleaned_data:
            target.staff_level = form.cleaned_data['staff_level']

        target.rank = form.cleaned_data.get('rank')

        target.roles.clear()
        target.roles.add(*form.cleaned_data['roles'])

        set_user_signature(request, target, form.cleaned_data.get('signature'))

        target.update_acl_key()
        target.save()

        messages.success(
            request, self.message_submit % {'user': target.username})


class DeletionStep(UserAdmin, generic.ButtonView):
    is_atomic = False

    def check_permissions(self, request, target):
        if not request.is_ajax():
            return _("This action can't be accessed directly")

        if target.is_staff or target.is_superuser:
            return _("%(user)s is admin and can't be deleted.") % {'user': target.username}

    def execute_step(self, user):
        raise NotImplementedError(
            "execute_step method should return dict with number of deleted_count and is_completed keys")

    def button_action(self, request, target):
        return JsonResponse(self.execute_step(target))


class DeleteThreadsStep(DeletionStep):
    def execute_step(self, user):
        recount_categories = set()

        deleted_threads = 0
        is_completed = False

        for thread in user.thread_set.order_by('-id')[:50]:
            recount_categories.add(thread.category_id)
            with transaction.atomic():
                thread.delete()
                deleted_threads += 1

        if recount_categories:
            for category in Category.objects.filter(id__in=recount_categories):
                category.synchronize()
                category.save()
        else:
            is_completed = True

        return {
            'deleted_count': deleted_threads,
            'is_completed': is_completed
        }


class DeletePostsStep(DeletionStep):
    def execute_step(self, user):
        recount_categories = set()
        recount_threads = set()

        deleted_posts = 0
        is_completed = False

        for post in user.post_set.order_by('-id')[:50]:
            recount_categories.add(post.category_id)
            recount_threads.add(post.thread_id)
            with transaction.atomic():
                post.delete()
                deleted_posts += 1

        if recount_categories:
            changed_threads_qs = Thread.objects.filter(id__in=recount_threads)
            for thread in batch_update(changed_threads_qs, 50):
                thread.synchronize()
                thread.save()

            for category in Category.objects.filter(id__in=recount_categories):
                category.synchronize()
                category.save()
        else:
            is_completed = True

        return {
            'deleted_count': deleted_posts,
            'is_completed': is_completed
        }


class DeleteAccountStep(DeletionStep):
    def execute_step(self, user):
        user.delete(delete_content=True)
        return {'is_completed': True}
