from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from .serializers import UserSerializer, ProfileSerializer
from .models import Profile, Freelancer
from jobs.permissions import IsOwnerOrReadOnly, IsOwner
from jobs.models import Job


class UserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class ProfileView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]


class FreelancerListView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Profile.objects.filter(freelancer__isnull=False)


class BecomeFreelancerView(generics.GenericAPIView):
    permission_classes = [IsOwner]

    def post(self, request, *args, **kwargs):
        pk = self.request.user.id
        profile = Profile.objects.get(pk=pk)
        Freelancer.objects.create(profile=profile, **request.data)

        # without context image url doesn't have domain name since serializer needs access to request object
        # https://www.django-rest-framework.org/api-guide/serializers/#including-extra-context
        return Response(ProfileSerializer(profile, context=self.get_serializer_context()).data)


class UnbecomeFreelancerView(generics.GenericAPIView):
    permission_classes = [IsOwner]

    def get(self, request, *args, **kwargs):
        pk = self.request.user.id
        profile = Profile.objects.get(pk=pk)
        profile.freelancer.delete()

        return Response(ProfileSerializer(profile, context=self.get_serializer_context()).data)


class HireFreelancerView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = User.objects.get(id=self.kwargs['pk'])
        job = Job.objects.get(pk=self.kwargs['id'])

        if user == job.freelancer:
            job.freelancer = None
            job.save()
        else:
            job.freelancer = user
            job.save()
        return self.retrieve(request, *args, **kwargs)
