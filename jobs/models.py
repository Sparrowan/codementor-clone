from django.db import models
from accounts.models import Profile


class JobRequest(models.Model):
    client = models.ForeignKey(Profile, on_delete=models.CASCADE)
    freelancer = models.ForeignKey(Profile, related_name='freelancer', blank=True, null=True, on_delete=models.SET_NULL)
    summary = models.CharField(max_length=50)
    details = models.TextField()
    technologies = models.CharField(max_length=150)
    deadline = models.DateTimeField()
    budget = models.PositiveIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.summary
