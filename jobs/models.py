from django.db import models
from django.contrib.auth.models import User


class Job(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    applicants = models.ManyToManyField(User, related_name='applications', blank=True)
    freelancer = models.ForeignKey(User, related_name='jobs', blank=True, null=True, on_delete=models.SET_NULL)
    summary = models.CharField(max_length=50)
    details = models.TextField()
    technologies = models.CharField(max_length=150)
    deadline = models.DateField()
    budget = models.PositiveIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.summary
