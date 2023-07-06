from django.db import models

class RawProduct(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    # Add more fields as per your requirements
