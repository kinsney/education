from django import forms
from django.conf import settings
from .models import SimplePage
from django.utils.translation import ugettext, ugettext_lazy as _

class SimplePageForm(forms.ModelForm):
    url = forms.RegexField(label="URL", max_length=100, regex=r'^[-\w/\.~]+$',
        help_text="例子: '/about/contact/'.",
        error_messages={
            "invalid": "包含不合法字符"
        },
    )
    class Meta:
        model = SimplePage
        fields = '__all__'
    def clean_url(self):
        url = self.cleaned_data['url']
        if not url.startswith('/'):
            raise forms.ValidationError(
                ugettext("URL is missing a leading slash."),
                code='missing_leading_slash',
            )
        if (settings.APPEND_SLASH and
                'django.middleware.common.CommonMiddleware' in settings.MIDDLEWARE_CLASSES and
                not url.endswith('/')):
            raise forms.ValidationError(
                ugettext("URL is missing a trailing slash."),
                code='missing_trailing_slash',
            )
        return url

    def clean(self):
        url = self.cleaned_data.get('url')
        sites = self.cleaned_data.get('sites')

        same_url = SimplePage.objects.filter(url=url)
        if self.instance.pk:
            same_url = same_url.exclude(pk=self.instance.pk)

        if sites and same_url.filter(sites__in=sites).exists():
            for site in sites:
                if same_url.filter(sites=site).exists():
                    raise forms.ValidationError(
                        _('Flatpage with url %(url)s already exists for site %(site)s'),
                        code='duplicate_url',
                        params={'url': url, 'site': site},
                    )

        return super(SimplePageForm, self).clean()
