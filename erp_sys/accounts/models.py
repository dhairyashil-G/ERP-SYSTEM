from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


user_role_choices = (('Admin', 'Admin'), ('Sales Team', 'Sales Team'),
                     ('Purchase Team', 'Purchase Team'),('QC Team', 'QC Team'), ('Dispatch Team', 'Dispatch Team'))

class CustomUser(AbstractUser):
    user_role = models.CharField(
        max_length=255, choices=user_role_choices, default="Sales Team")

    def __str__(self):
        return self.username