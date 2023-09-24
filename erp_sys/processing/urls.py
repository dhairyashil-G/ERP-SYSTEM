from django.contrib import admin
from django.urls import path,include
from . import views


urlpatterns = [
     path('create/', views.ProductCreateView.as_view(), name='product-create'),
     path('list/', views.ProductListView.as_view(), name='raw-product-list'),
     path("delete/<int:pk>/", views.ProductDeleteView.as_view(), name="delete"),
     path('batch-sheet/create/', views.CreateBatchSheetView.as_view(), name='create-batch-sheet'),
     path('updateproducttable',views.UpdateProductTableView.as_view(),name='update-product-table'),
     path('salestable',views.SalesListView.as_view(),name='sales'),
     path('updateproductspecs',views.UpdateProductSpecsView.as_view(),name='update-product-table'),
     # path('batch-sheet/download/',views.DownloadBatchSheetView.as_view(), name='download_batch_sheet'),
]