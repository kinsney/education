from django.contrib import messages
from django.core.urlresolvers import reverse
from django.shortcuts import redirect
from django.utils.translation import ugettext_lazy as _

from misago.admin.views import generic

from .forms import RoleForm, get_permissions_forms
from .models import Role


class RoleAdmin(generic.AdminBaseMixin):
    root_link = 'misago:admin:permissions:users:index'
    Model = Role
    templates_dir = 'misago/admin/roles'
    message_404 = _("Requested role does not exist.")


class RolesList(RoleAdmin, generic.ListView):
    ordering = (('name', None),)


class RoleFormMixin(object):
    def real_dispatch(self, request, target):
        form = RoleForm(instance=target)

        perms_forms = get_permissions_forms(target)

        if request.method == 'POST':
            perms_forms = get_permissions_forms(target, request.POST)
            valid_forms = 0
            for permissions_form in perms_forms:
                if permissions_form.is_valid():
                    valid_forms += 1

            form = RoleForm(request.POST, instance=target)
            if form.is_valid() and len(perms_forms) == valid_forms:
                new_permissions = {}
                for permissions_form in perms_forms:
                    cleaned_data = permissions_form.cleaned_data
                    new_permissions[permissions_form.prefix] = cleaned_data

                form.instance.permissions = new_permissions
                form.instance.save()

                messages.success(
                    request, self.message_submit % {'name': target.name})

                if 'stay' in request.POST:
                    return redirect(request.path)
                else:
                    return redirect(self.root_link)
            elif form.is_valid() and len(perms_forms) != valid_forms:
                form.add_error(None, _("Form contains errors."))

        return self.render(
            request,
            {
                'form': form,
                'target': target,
                'perms_forms': perms_forms,
            })


class NewRole(RoleFormMixin, RoleAdmin, generic.ModelFormView):
    message_submit = _('New role "%(name)s" has been saved.')


class EditRole(RoleFormMixin, RoleAdmin, generic.ModelFormView):
    message_submit = _('Role "%(name)s" has been changed.')


class DeleteRole(RoleAdmin, generic.ButtonView):
    def check_permissions(self, request, target):
        if target.special_role:
            message = _('Role "%(name)s" is special role '
                        'and can\'t be deleted.')
            return message % {'name': target.name}

    def button_action(self, request, target):
        target.delete()
        message = _('Role "%(name)s" has been deleted.')
        messages.success(request, message % {'name': target.name})


class RoleUsers(RoleAdmin, generic.TargetedView):
    def real_dispatch(self, request, target):
        redirect_url = reverse('misago:admin:users:accounts:index')
        return redirect('%s?role=%s' % (redirect_url, target.pk))
