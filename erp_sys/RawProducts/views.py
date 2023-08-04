from rest_framework import viewsets
from rest_framework import generics
from .serializer import RawProductSerializer
from .models import RawProduct

# class RawProductViewSet(viewsets.ModelViewSet):
#     queryset = RawProduct.objects.all()
#     serializer_class = RawProductSerializer

class RawProductCreateView(generics.CreateAPIView):
    queryset = RawProduct.objects.all()
    serializer_class = RawProductSerializer


class RawProductListView(generics.ListAPIView):
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

# class RawProductTestView:
#     # foward data to admin for validation
#     pass

# class RawProductLoadView:
#     # copy data from temporary db to final db
#     pass