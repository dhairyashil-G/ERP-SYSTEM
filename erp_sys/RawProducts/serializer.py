from rest_framework import serializers
from .models import RawProduct

# class RawProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RawProduct
#         fields = '__all__'

class RawProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = RawProduct
        fields = ['name', 'quantity','fcode']
    
    def update(self, instance, validated_data):
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance