from rest_framework import viewsets
from rest_framework import generics
from .serializer import RawProductSerializer
from .models import RawProduct
from accounts.permissions import IsPurchaseTeam
from rest_framework.permissions import IsAuthenticated

# class RawProductViewSet(viewsets.ModelViewSet):
#     queryset = RawProduct.objects.all()
#     serializer_class = RawProductSerializer

class RawProductCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = RawProduct.objects.all()
    serializer_class = RawProductSerializer


class RawProductListView(generics.ListAPIView):
    permission_classes = [IsPurchaseTeam]
    queryset = RawProduct.objects.all()
    serializer_class = RawProductSerializer


class RawProductUpdateView(generics.UpdateAPIView):
    queryset = RawProduct.objects.all()
    # permission_classes = [IsAuthenticated]
    serializer_class = RawProductSerializer

class RawProductDeleteView(generics.DestroyAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = RawProduct.objects.all()
    serializer_class = RawProductSerializer

