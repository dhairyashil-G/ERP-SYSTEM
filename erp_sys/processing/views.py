from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics,status
from rest_framework.response import Response
from .serializer import ProductsSerializer
from .models import Products
from rest_framework.views import APIView
# from fpdf import FPDF
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from django.http import HttpResponse
# Create your views here.

class ProductCreateView(generics.CreateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

class ProductListView(generics.ListAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

class ProductDeleteView(generics.DestroyAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

class CreateBatchSheetView(APIView):
    # def post(self, request):
    #     product_name = request.data.get('product_name')
    #     quantity = request.data.get('quantity')

    #     try:
    #         product = Products.objects.get(name=product_name)
    #     except Products.DoesNotExist:
    #         return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    #     weights = [float(weight.replace('[', '').replace(']', '')) * quantity for weight in product.weights.split(',')]
    #     batch_sheet = {
    #         "product_name": product.name,
    #         "quantity": quantity,
    #         "raw_materials": product.raw_materials.split(','),
    #         "weights": weights,
    #         "sequences": product.sequences.split(',')
    #     }

    #     response = HttpResponse(content_type='application/pdf')
    #     response['Content-Disposition'] = 'attachment; filename="batch_sheet.pdf"'

    #     # Create the PDF canvas
    #     p = canvas.Canvas(response, pagesize=letter)

    #     # Set the content of the batch sheet
    #     p.setFont("Helvetica", 12)
    #     p.drawString(100, 700, "Product Name: " + product.name)
    #     p.drawString(100, 680, "Quantity: " + str(quantity))
    #     p.drawString(100, 660, "Raw Materials: " + ', '.join(batch_sheet.raw_materials))
    #     p.drawString(100, 640, "Weights: " + ', '.join(str(weight) for weight in batch_sheet.weights))
    #     p.drawString(100, 620, "Sequences: " + ', '.join(batch_sheet.sequences))

    #     # Save the PDF
    #     p.showPage()
    #     p.save()

    #     return response
    #     # return Response(batch_sheet, status=status.HTTP_200_OK)


    def post(self, request):
        product_name = request.data.get('product_name')
        quantity = request.data.get('quantity')

        try:
            product = Products.objects.get(name=product_name)
        except Products.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        # Prepare data for the batch sheet
        weights = [float(weight.replace('[', '').replace(']', '')) * quantity for weight in product.weights.split(',')]
        raw_materials = product.raw_materials.split(',')
        sequences = product.sequences.split(',')

        # Create the response as a PDF
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="batch_sheet.pdf"'

        # Create the PDF document
        doc = SimpleDocTemplate(response, pagesize=letter)
        elements = []

        # Define the table data
        data = [
            ["Product Name:", product.name],
            ["Quantity:", str(quantity)],
            ["Raw Materials:", ', '.join(raw_materials)],
            ["Weights:", ', '.join(str(weight) for weight in weights)],
            ["Sequences:", ', '.join(sequences)]
        ]

        # Define table styles
        styles = getSampleStyleSheet()
        table_style = TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.lightgrey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
            ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 12),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ])

        # Create the table
        table = Table(data)
        table.setStyle(table_style)

        # Add the table to the document
        elements.append(table)

        # Build the PDF document
        doc.build(elements)

        return response


