from django.core.exceptions import PermissionDenied
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Job
from .serializers import JobSerializer
from .permissions import IsOwnerOrReadOnly


class JobListCreateView(generics.ListCreateAPIView):
    queryset = Job.objects.all().order_by('-timestamp')
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class JobDetailEditDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsOwnerOrReadOnly]


class ApplyForJobView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        if hasattr(user.profile, 'freelancer'):
            job = Job.objects.get(pk=self.kwargs['pk'])

            if user in job.applicants.all():
                job.applicants.remove(user)
            else:
                job.applicants.add(user)
            return self.retrieve(request, *args, **kwargs)
        raise PermissionDenied
