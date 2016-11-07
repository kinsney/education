from rest_framework import serializers

from ..models import UsernameChange
from .user import BasicUserSerializer


__all__ = ['UsernameChangeSerializer']


class UsernameChangeSerializer(serializers.ModelSerializer):
    user = BasicUserSerializer(many=False, read_only=True)
    changed_by = BasicUserSerializer(many=False, read_only=True)

    class Meta:
        model = UsernameChange
        fields = (
            'id',
            'user',
            'changed_by',
            'changed_by_username',
            'changed_on',
            'new_username',
            'old_username'
        )
