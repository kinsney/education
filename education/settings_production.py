"""
Misago settings for testforum project.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os

from misago.conf.defaults import *


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

INSTALLED_APPS += (
    'home',
    'device',
    'ckeditor',
    'ckeditor_uploader',
)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False


# Hosts allowed to POST to your site
# If you are unsure, just enter here your host name, eg. 'mysite.com'

ALLOWED_HOSTS = ['www.yanheedu.cn','yanheedu.cn']


# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

DATABASES = {
    'default': {
        # Only PostgreSQL is supported
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'education',
        'USER': 'yanhedb',
        'PASSWORD':'Kinsney123',
        'HOST': 'rm-2ze470sqf77tr9285o.pg.rds.aliyuncs.com',
        'PORT': 3432,
    }
}


# Cache
# https://docs.djangoproject.com/en/1.9/ref/settings/#caches

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}


# Site language
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'zh-cn'

# Fallback Timezone
# Used to format dates on server, that are then
# presented to clients with d
# isabled JS
# Consult http://en.wikipedia.org/wiki/List_of_tz_database_time_zones TZ column
# for valid values

TIME_ZONE = 'Asia/Shanghai'


# Path used to access static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/

STATIC_URL = '/static/'

# Path used to access uploaded media (Avatars and Profile Backgrounds, ect.)
# This is NOT path used to serve posts attachments.
# https://docs.djangoproject.com/en/1.9/howto/static-files/
MEDIA_URL = '/media/'


# Automatically setup default paths to media and attachments directories
MISAGO_ATTACHMENTS_ROOT = os.path.join(BASE_DIR, 'attachments')
MISAGO_AVATAR_STORE = os.path.join(BASE_DIR, 'avatar_store')

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
STATIC_ROOT = os.path.join(BASE_DIR, 'static')


# Automatically setup default paths for static and template directories
# You can use those directories to easily customize and add your own
# assets and templates to your site
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'theme', 'static'),
) + STATICFILES_DIRS

TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, 'theme', 'templates'),
    os.path.join(BASE_DIR,'education','templates')
) + TEMPLATE_DIRS


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '0z=l4oi_#cdr3wcxgyk*&!y7j8ezih#$wz&$ig@=6$vf@!%-pe'


# X-Sendfile support
# X-Sendfile is feature provided by Http servers that allows web apps to
# delegate serving files over to the better performing server instead of
# doing it within app.
# If your server supports X-Sendfile or its variation, enter header name here.
# For example if you are using Nginx with X-accel enabled, set this setting
# to "X-Accel-Redirect".
# Leave this setting empty to Django fallback instead
MISAGO_SENDFILE_HEADER = ''

# Allows you to use location feature of your Http server
# For example, if you have internal location /mymisago/avatar_cache/
# that points at /home/myweb/misagoforum/avatar_cache/, set this setting
# to "mymisago".
MISAGO_SENDFILE_LOCATIONS_PATH = ''


# Application definition
# Don't edit those settings unless you know what you are doing
ROOT_URLCONF = 'education.urls'
WSGI_APPLICATION = 'education.wsgi.application'


#富文本编辑ck settings
TINYMCE_DEFAULT_CONFIG = {
    'plugins': "table,spellchecker,paste,searchreplace",
    'theme': "advanced",
    'cleanup_on_startup': True,
    'custom_undo_redo_levels': 10,
    'external_image_list_url' : "lists/image_list.js",
    'style_formats' : [
        {'title' : 'Bold text', 'inline' : 'strong'},
        {'title' : 'Red text', 'inline' : 'span', 'styles' : {'color' : '#ff0000'}},
        {'title' : 'Help', 'inline' : 'strong', 'classes' : 'help'},
        {'title' : 'Table styles'},
        {'title' : 'Table row 1', 'selector' : 'tr', 'classes' : 'tablerow'}
    ],
}

CKEDITOR_JQUERY_URL = '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js'
CKEDITOR_UPLOAD_PATH = "ckupload/"
CKEDITOR_IMAGE_BACKEND = "pillow"
CKEDITOR_RESTRICT_BY_USER = True

#aliyun oss settings
#注释后使用默认存储设置
ACCESS_KEY_ID = "LTAIgxtquk5E15ut"
ACCESS_KEY_SECRET = "DyMSzsy8czsvYHsN550xxIx8UustMG"
END_POINT = "oss-cn-beijing.aliyuncs.com"
BUCKET_NAME = "yanhe-edu"
BUCKET_ACL_TYPE = "public-read-write"  # private, public-read, public-read-write

DEFAULT_FILE_STORAGE = 'aliyun_oss2_storage.backends.AliyunMediaStorage'


#aliyun mail settings

# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

EMAIL_USE_TLS = False
EMAIL_HOST = 'smtpdm.aliyun.com'
EMAIL_PORT = 25
EMAIL_HOST_USER = 'post@verify.yanheedu.cn'
EMAIL_HOST_PASSWORD = 'Dxhsdsb123'
DEFAULT_FROM_EMAIL = 'post@verify.yanheedu.cn'
