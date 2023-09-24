from rest_framework import serializers
from .models import Products,Sales,ProductsSpecs

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'

class SalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sales
        fields = ['name', 'price_per_kg'] 

class ProductSpecsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductsSpecs
        fields ='__all__'