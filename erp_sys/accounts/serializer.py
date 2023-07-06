from .models import CustomUser
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['username'] = user.username
        # token['email'] = user.email
        # token['user_role'] = user.user_role
        # ...
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'username', 'email',
                  'user_role', 'password1', 'password2')

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password1": "Password fields don't match."})

        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create(username=validated_data['username'])

        user.set_password(validated_data['password1'])

        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']

        user.email = validated_data['email']

        user.user_role = validated_data['user_role']

        user.save()

        return user
