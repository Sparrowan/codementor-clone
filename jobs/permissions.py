from rest_framework import permissions


# custom permission which allows only owner of the job to edit and delete it
# anyone can view the job
class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # safe methods are 'GET', 'HEAD', 'OPTIONS'
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user
