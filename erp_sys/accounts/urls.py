from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView,TokenVerifyView

urlpatterns = [
    path("", views.getRoutes, name="accounts_routes"),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', views.RegisterView.as_view(), name='auth_register'),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path(
        "change-password/", views.ChangePasswordView.as_view(), name="change_password"
    ),
    path("password-reset/", views.PasswordResetView.as_view(), name="password_reset"),
    path(
        "password-reset-confirm/<int:pk>/<str:token>/",
        views.PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
]
