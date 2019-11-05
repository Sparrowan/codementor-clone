from rest_framework import serializers

from .models import Job


class JobSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    applicants = serializers.StringRelatedField()
    freelancer = serializers.StringRelatedField()

    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ['user', 'applicants', 'freelancer']
