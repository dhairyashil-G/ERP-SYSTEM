from rest_framework import serializers
from .models import RawProduct

class RawProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = RawProduct
        fields = '__all__'