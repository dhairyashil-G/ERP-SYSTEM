from datetime import datetime
from django.shortcuts import render
from django.views import View
import requests
from rest_framework import viewsets
from rest_framework import generics,status
from rest_framework.response import Response
from .serializer import ProductsSerializer
from .models import Products
from rest_framework.views import APIView

from fpdf import FPDF
import json
from io import BytesIO
from rest_framework.permissions import IsAuthenticated
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from django.http import HttpResponse
# Create your views here.

class ProductCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

class ProductListView(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

class ProductDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

class CreateBatchSheetView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        product_name = request.data.get('product_name')
        quantity = request.data.get('quantity')
        pdf=request.data.get('pdf')
        try:
            product = Products.objects.get(name=product_name)
        except Products.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        # Prepare data for the batch sheet
        weights = [float(weight.replace('[', '').replace(']', '')) * quantity for weight in product.weights.split(',')]
        raw_materials = product.raw_materials.split(',')
        sequences = product.sequences.split(',')

        # Create the response data
        batch_sheet_data = {
            "product_name": product.name,
            "quantity": quantity,
            "raw_materials": raw_materials,
            "weights": weights,
            "sequences": sequences
        }

        if(pdf):
            pdf = FPDF()
            pdf.add_page()

            pdf.image('processing/images/logo.jpeg', x=10, y=5, w=50, h=20)
            pdf.set_font('Arial', 'BU', 18)
            pdf.cell(0, 10, 'Product BatchSheet', align='C', ln=1)
            pdf.ln(5)

            pdf.set_font('Arial', 'B', 12)
            pdf.ln(10)
            pdf.cell(0, 10, f'Product Name : {product_name}', ln=1)
            pdf.cell(0, 10, f'Quantity : {quantity}', ln=1)
            pdf.ln(5)

            # Create a table for weights, raw materials, and sequences
            pdf.set_font('Arial', 'B', 10)
            pdf.cell(40, 10, 'Raw Materials', 1)
            pdf.cell(40, 10, 'Weights', 1)
            pdf.cell(40, 10, 'Sequences', 1)
            pdf.ln()

            pdf.set_font('Arial', '', 10)
            for weight, raw_material, sequence in zip(weights, raw_materials, sequences):
                pdf.cell(40, 10, raw_material, 1)
                pdf.cell(40, 10, str(weight), 1)
                pdf.cell(40, 10, sequence, 1)
                pdf.ln()

            pdf_bytes = pdf.output(dest='S').encode('latin-1')
            pdf_buffer = BytesIO(pdf_bytes)
            filename = "Batchsheet" + \
                datetime.now().strftime("%d-%m-%Y,%H:%M:%S")+".pdf"

            response = HttpResponse(content_type='application/pdf')
            response['Content-Disposition'] = 'attachment; filename="{}"'.format(
                filename)

            pdf_data = pdf_buffer.getvalue()
            response.write(pdf_data)

            return response
            

        # Return the data as a JSON response
        return Response(batch_sheet_data)
