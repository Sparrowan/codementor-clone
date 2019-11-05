from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Profile, Freelancer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class FreelancerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Freelancer
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    freelancer = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = '__all__'

    def get_user(self, obj):
        return UserSerializer(obj.user).data

    def get_freelancer(self, obj):
        if hasattr(obj, 'freelancer'):
            return FreelancerSerializer(obj.freelancer).data
        return None
