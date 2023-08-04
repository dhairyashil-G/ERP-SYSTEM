from django.db import models

class Products(models.Model):
    name = models.CharField(max_length=255,primary_key=True)
    raw_materials = models.CharField(max_length=255)
    weights = models.CharField(max_length=255)
    sequences = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name

# Create your models here.
