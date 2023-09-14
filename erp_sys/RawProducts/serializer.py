from rest_framework import serializers
from .models import RawProduct

class RawProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = RawProduct
        fields = '__all__'

# class RawProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RawProduct
#         fields = ['name', 'quantity','fcode']
    
    def update(self, instance, validated_data):
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.calcium_content=validated_data.get('calcium_content',instance.calcium_content)
        instance.magnesium_content=validated_data.get('magnesium_content',instance.magnesium_content)
        instance.zinc_content=validated_data.get('zinc_content',instance.zinc_content)
        instance.nitrogen_content=validated_data.get('nitrogen_content',instance.nitrogen_content)
        instance.moly_content=validated_data.get('moly_content',instance.moly_content)
        instance.TBN_content=validated_data.get('TBN_content',instance.TBN_content)
        instance.phosphorus_content=validated_data.get('phosphorus_content',instance.phosphorus_content)
        instance.sulfur_content=validated_data.get('sulfur_content',instance.sulfur_content)
        instance.boron_content=validated_data.get('boron_content',instance.boron_content)
        instance.price=validated_data.get('price',instance.price)
        instance.save()
        return instance