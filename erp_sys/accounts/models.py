from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


user_role_choices = (('Admin', 'Admin'), ('Sales Team', 'Sales Team'),
                     ('Purchase Team', 'Purchase Team'),('QC Team', 'QC Team'), ('Dispatch Team', 'Dispatch Team'))

class CustomUser(AbstractUser):
    user_role = models.CharField(
        max_length=255, choices=user_role_choices, default="Sales Team")
    # # Add a related_name argument to the 'groups' field
    # groups = models.ManyToManyField(
    #     'auth.Group',
    #     verbose_name='groups',
    #     blank=True,
    #     related_name='customuser_set',
    #     related_query_name='user',
    # )

    # # Add a related_name argument to the 'user_permissions' field
    # user_permissions = models.ManyToManyField(
    #     'auth.Permission',
    #     verbose_name='user permissions',
    #     blank=True,
    #     related_name='customuser_set',
    #     related_query_name='user',
    # )

    def __str__(self):
        return self.username