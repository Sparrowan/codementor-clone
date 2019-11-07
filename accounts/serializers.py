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

    def update(self, instance, validated_data):
        print(validated_data)
        user_data = validated_data.pop('user')
        user = instance.user
        user.username = user_data.get('username', user.username)
        user.email = user_data.get('email', user.email)
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.save()

        if hasattr(instance, 'freelancer'):
            freelancer_data = validated_data.pop('freelancer')
            freelancer = instance.freelancer
            freelancer.bio = freelancer_data.get('bio', user.bio)
            freelancer.technologies = freelancer_data.get('technologies', user.technologies)

        instance.photo = validated_data.get('photo', instance.photo)
        instance.social_accounts = validated_data.get('social_accounts', instance.social_accounts)
        instance.timezone = validated_data.get('timezone', instance.timezone)
        instance.languages = validated_data.get('languages', instance.languages)
        instance.save()

        return instance
