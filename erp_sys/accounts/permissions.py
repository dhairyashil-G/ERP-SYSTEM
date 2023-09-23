from rest_framework import permissions

class IsPurchaseTeam(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated and their user_role is "Purchase Team"
        return request.user.is_authenticated and request.user.user_role == 'Purchase Team'
