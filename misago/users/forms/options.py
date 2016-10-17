from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from django.utils.translation import ungettext

from misago.conf import settings
from misago.core import forms

from ..models import AUTO_SUBSCRIBE_CHOICES, PRIVATE_THREAD_INVITES_LIMITS_CHOICES
from ..validators import validate_email, validate_password


class ForumOptionsForm(forms.ModelForm):
    is_hiding_presence = forms.YesNoSwitch()

    limits_private_thread_invites_to = forms.TypedChoiceField(
        coerce=int, choices=PRIVATE_THREAD_INVITES_LIMITS_CHOICES)

    subscribe_to_started_threads = forms.TypedChoiceField(
        coerce=int, choices=AUTO_SUBSCRIBE_CHOICES)

    subscribe_to_replied_threads = forms.TypedChoiceField(
        coerce=int, choices=AUTO_SUBSCRIBE_CHOICES)

    class Meta:
        model = get_user_model()
        fields = [
            'is_hiding_presence',
            'limits_private_thread_invites_to',
            'subscribe_to_started_threads',
            'subscribe_to_replied_threads'
        ]


class EditSignatureForm(forms.ModelForm):
    signature = forms.CharField(required=False)

    class Meta:
        model = get_user_model()
        fields = ['signature']

    def clean(self):
        data = super(EditSignatureForm, self).clean()

        if len(data.get('signature', '')) > settings.signature_length_max:
            raise forms.ValidationError(_("Signature is too long."))

        return data


class ChangePasswordForm(forms.Form):
    password = forms.CharField(max_length=200)
    new_password = forms.CharField(max_length=200)

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        super(ChangePasswordForm, self).__init__(*args, **kwargs)

    def clean_password(self):
        if not self.user.check_password(self.cleaned_data['password']):
            raise forms.ValidationError(_("Entered password is invalid."))

    def clean_new_password(self):
        data = self.cleaned_data['new_password']
        validate_password(data)
        return data


class ChangeEmailForm(forms.Form):
    password = forms.CharField(max_length=200)
    new_email = forms.CharField(max_length=200)

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        super(ChangeEmailForm, self).__init__(*args, **kwargs)

    def clean_password(self):
        if not self.user.check_password(self.cleaned_data['password']):
            raise forms.ValidationError(_("Entered password is invalid."))

    def clean_new_email(self):
        data = self.cleaned_data['new_email']

        if not data:
            message = _("You have to enter new e-mail address.")
            raise forms.ValidationError(message)

        if data.lower() == self.user.email.lower():
            message = _("New e-mail is same as current one.")
            raise forms.ValidationError(message)

        validate_email(data)

        return data
