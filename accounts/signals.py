from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.contrib.auth.models import User

from .models import Profile


# create a user's profile when a new user is registered
# should be registered in apps.py
@receiver(post_save, sender=User)
def create_profile(sender, **kwargs):
    if kwargs['created']:
        Profile.objects.create(user=kwargs['instance'])


# delete user object when related profile is deleted
@receiver(post_delete, sender=Profile)
def delete_user(sender, instance, **kwargs):
    User.objects.get(id=instance.user.id).delete()
