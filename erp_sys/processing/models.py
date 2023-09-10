from django.db import models

class Products(models.Model):
    name = models.CharField(max_length=255,primary_key=True)
    raw_materials = models.CharField(max_length=255)
    weights = models.CharField(max_length=255)
    sequences = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name

class ProductsSpecs(models.Model):
    name= models.CharField(max_length=255,primary_key=True)
    calcium_content = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    magnesium_content = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    zinc_content = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    nitrogen_content = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    moly_content = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    
    TBN_content = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    nitrogen_content = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    phosphorus_content = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    sulfur_content = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    boron_content = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

# Create your models here.
