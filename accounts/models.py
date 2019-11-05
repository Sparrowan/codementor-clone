from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.ImageField(default='profile_default.jpg', upload_to='profile_images')
    social_accounts = models.TextField(blank=True)
    timezone = models.CharField(max_length=50)
    languages = models.CharField(max_length=150)

    def __str__(self):
        return f'{self.user} profile'


class Freelancer(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    technologies = models.CharField(max_length=150)

    def __str__(self):
        return f'{self.profile.user} freelancer'
