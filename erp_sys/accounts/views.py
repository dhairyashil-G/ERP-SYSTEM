from .serializer import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from .models import CustomUser
from rest_framework.permissions import AllowAny
from accounts.permissions import IsAdmin

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (IsAdmin)
    serializer_class = RegisterSerializer
