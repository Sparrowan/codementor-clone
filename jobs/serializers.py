from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Job
from accounts.serializers import UserSerializer


class JobSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    applicants = serializers.SerializerMethodField()
    freelancer = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ['user', 'applicants', 'freelancer']

    def get_applicants(self, obj):
        applicants = []
        for a in obj.applicants.all():
            applicant = {
                'id': a.id,
                'first_name': a.first_name,
                'last_name': a.last_name,
            }
            applicants.append(applicant)
        return applicants

    def get_freelancer(self, obj):
        if obj.freelancer:
            return UserSerializer(obj.freelancer).data
        return None
