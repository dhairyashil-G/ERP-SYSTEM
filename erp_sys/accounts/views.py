from .serializer import (
    MyTokenObtainPairSerializer, 
    RegisterSerializer,
    PasswordResetConfirmSerializer,
    PasswordResetSerializer,
    ChangePasswordSerializer
    )
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, exceptions
from django.contrib.auth.tokens import default_token_generator
from rest_framework.decorators import api_view, permission_classes
from .models import CustomUser
from django.core.mail import send_mail
from django.urls import reverse
from django.conf import settings
from rest_framework.permissions import AllowAny
from accounts.permissions import IsAdmin

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (IsAdmin)
    serializer_class = RegisterSerializer

class ChangePasswordView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = ChangePasswordSerializer

    def get_object(self):
        return self.request.user

class PasswordResetView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = PasswordResetSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = CustomUser.objects.get(email=serializer.data["email"])

        # Generate password reset token and URL
        token = default_token_generator.make_token(user)
        pk = str(user.pk)
        password_reset_url = reverse(
            "password_reset_confirm", kwargs={"pk": pk, "token": token}
        )

        print(password_reset_url)

        # Send password reset email
        send_mail(
            subject="Password Reset Request",
            message=f"Click the link to reset your password: {password_reset_url}",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=False,
        )

        return Response({"success": "Password reset email sent."})


class PasswordResetConfirmView(generics.UpdateAPIView):
    permission_classes = [AllowAny]
    serializer_class = PasswordResetConfirmSerializer

    def get_object(self):
        pk = self.kwargs.get("pk")
        token = self.kwargs.get("token")

        user = CustomUser.objects.get(id=int(pk))
        if not user:
            raise exceptions.NotFound("User Not available")

        if not default_token_generator.check_token(user, token):
            raise exceptions.NotFound("Invalid token")

        return user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        password = serializer.validated_data["password"]
        user.set_password(password)
        user.save()
        return Response({"detail": "Password reset successful"})

@api_view(["GET"])
@permission_classes([AllowAny])
def getRoutes(request):
    routes = [
        "/token",
        "/token/refresh",
        "/token/verify",
        "/change-password",
        "/password-reset",
        "/password-reset-confirm/<int:pk>/<str:token>/",
        "/signup",
    ]

    return Response(routes)