from rest_framework import viewsets
from .serializers import RawProductSerializer
from .models import RawProduct

class RawProductViewSet(viewsets.ModelViewSet):
    queryset = RawProduct.objects.all()
    serializer_class = RawProductSerializer