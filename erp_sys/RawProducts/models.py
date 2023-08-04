from django.db import models

class RawProduct(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    fcode = models.CharField(max_length=20,default="N.A")
    # Add more fields as per your requirements
