from django.db import models

class RawProduct(models.Model):
    name = models.CharField(max_length=100)

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


    quantity = models.IntegerField()

    fcode = models.CharField(max_length=20, default="N.A")
    # Add more fields as per your requirements
