from django.contrib import admin
from .models import Products,ProductsSpecs,Sales
# Register your models here.

admin.site.register(Products)
admin.site.register(ProductsSpecs)
admin.site.register(Sales)