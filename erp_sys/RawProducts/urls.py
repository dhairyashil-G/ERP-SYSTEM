"""
URL configuration for erp_sys project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from . import views


urlpatterns = [
    # path('add_rawproducts/',views.RawProductViewSet.as_view(),name="add_rawproduct_data"),
     path("", views.getRoutes, name="processing_routes"),
     path('create/', views.RawProductCreateView.as_view(), name='raw-product-create'),
     path('list/', views.RawProductListView.as_view(), name='raw-product-list'),
     path("update/<int:pk>/", views.RawProductUpdateView.as_view(), name="update"),
     path("delete/<int:pk>/", views.RawProductDeleteView.as_view(), name="delete"),
    #  path("testing/",views.RawProductTestView.as_view(),name="test"), 
    #  path('approved/',views.RawProductLoadView.asview(),name="load") ,
    ]
