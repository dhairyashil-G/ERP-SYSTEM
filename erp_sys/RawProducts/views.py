from rest_framework import viewsets
from rest_framework import generics
from .serializer import RawProductSerializer
from .models import RawProduct
from accounts.permissions import IsPurchaseTeam,IsAdmin
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

class RawProductCreateView(generics.CreateAPIView):
    # permission_classes = [IsPurchaseTeam | IsAdmin]
    queryset = RawProduct.objects.all()
    serializer_class = RawProductSerializer


class RawProductListView(generics.ListAPIView):
    # permission_classes = [IsPurchaseTeam | IsAdmin]
    queryset = RawProduct.objects.all()
    serializer_class = RawProductSerializer


class RawProductUpdateView(generics.UpdateAPIView):
    queryset = RawProduct.objects.all()
    # permission_classes = [IsPurchaseTeam | IsAdmin]
    serializer_class = RawProductSerializer

class RawProductDeleteView(generics.DestroyAPIView):
    # permission_classes = [IsPurchaseTeam | IsAdmin]
    queryset = RawProduct.objects.all()
    serializer_class = RawProductSerializer

@api_view(["GET"])
@permission_classes([AllowAny])
def getRoutes(request):
    routes = [
        'create/',
        'list/',
        "update/<int:pk>/",
        "delete/<int:pk>/"
    ]
    return Response(routes)