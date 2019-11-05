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
