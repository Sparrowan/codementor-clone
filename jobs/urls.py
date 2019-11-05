from django.urls import path

from . import views


urlpatterns = [
    path('', views.JobListCreateView.as_view()),
    path('<int:pk>/', views.JobDetailEditDeleteView.as_view()),
]
