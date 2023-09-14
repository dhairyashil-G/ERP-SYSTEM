from datetime import datetime
from rest_framework import generics,status
from rest_framework.response import Response
from .serializer import ProductsSerializer,SalesSerializer
from .models import Products,ProductsSpecs,Sales
from RawProducts.models import RawProduct
from rest_framework.views import APIView
from collections import defaultdict
from fpdf import FPDF
from io import BytesIO
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
# Create your views here.

class ProductCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

class ProductListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

class ProductDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

class UpdateProductTableView(APIView):
    def get(self,request):
        products=list(Products.objects.values_list('name', flat=True))
        for product_name in products:
            try:
                product = Products.objects.get(name=product_name)
            except Products.DoesNotExist:
                return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

            # Prepare data for the batch sheet
                    # Step 1: Search for raw materials required for a given product name
        
            try:
                product = Products.objects.get(name=product_name)
                raw_materials = product.raw_materials.split(',')  # Assuming raw materials are comma-separated
            except Products.DoesNotExist:
                raw_materials = []
            raw_materials = [element.strip('[] ') for element in raw_materials]
            
            ProductsSpecs_tuple = ProductsSpecs.objects.get(name=product_name)

            ans={value:0 for value in raw_materials}
            if('A.O.1' in raw_materials):
                RawProduct_tuple = RawProduct.objects.get(name='A.O.1')
                ans['A.O.1']=float((ProductsSpecs_tuple.zinc_content/RawProduct_tuple.zinc_content)*100)
                # ans['TBN']=ans['TBN']+RawProduct_tuple.TBN_content
            if('A.O.2' in raw_materials):
                RawProduct_tuple = RawProduct.objects.get(name='A.O.2')
                ans['A.O.2']=float((ProductsSpecs_tuple.zinc_content/RawProduct_tuple.zinc_content)*100)
                # ans['TBN']=ans['TBN']+RawProduct_tuple.TBN_content
            if('DISPERSANT 1' in raw_materials):
                RawProduct_tuple = RawProduct.objects.get(name='DISPERSANT 1')
                ans['DISPERSANT 1']=float((ProductsSpecs_tuple.nitrogen_content/RawProduct_tuple.nitrogen_content)*100)
                # ans['TBN']=ans['TBN']+RawProduct_tuple.TBN_content
            if('DISPERSANT 2' in raw_materials):
                RawProduct_tuple = RawProduct.objects.get(name='DISPERSANT 2')
                ans['DISPERSANT 2']=float((ProductsSpecs_tuple.nitrogen_content/RawProduct_tuple.nitrogen_content)*100)
                # ans['TBN']=ans['TBN']+RawProduct_tuple.TBN_content
            if('MODTC' in raw_materials):
                RawProduct_tuple = RawProduct.objects.get(name='MODTC')
                ans['MODTC']=float((ProductsSpecs_tuple.moly_content/RawProduct_tuple.moly_content)*100)
                # ans['TBN']=ans['TBN']+RawProduct_tuple.TBN_content
            if('C400' in raw_materials):
                Products_tuple= Products.objects.get(name=product_name)
                RawProduct_tuple = RawProduct.objects.get(name='PH250')
                Products_tuple_weightss=eval(Products_tuple.weights)
                Products_tuple_weights=Products_tuple_weightss[1]
                print('ProductsSpecs_tuple.calcium_content',ProductsSpecs_tuple.calcium_content)
                a=float(ProductsSpecs_tuple.calcium_content)-((float(Products_tuple_weights)*float(RawProduct_tuple.calcium_content))/100)
                
                RawProduct_tuple2 = RawProduct.objects.get(name='C400')
                print('RawProduct_tuple2.calcium_content',RawProduct_tuple2.calcium_content)
                batch_c400=((a)/float(RawProduct_tuple2.calcium_content))*100
                ans['C400']=batch_c400
            if('PH250' in raw_materials):
                Products_tuple= Products.objects.get(name=product_name)
                Products_tuple_weightss=eval(Products_tuple.weights)
                Products_tuple_weights=Products_tuple_weightss[1]
                ans['PH250']=Products_tuple_weights
            if('A.FOAM' in raw_materials):
                ans['A.FOAM']=0.2
            if('DND' in raw_materials):
                Products_tuple= Products.objects.get(name=product_name)
                Products_tuple_weightss=eval(Products_tuple.weights)
                Products_tuple_weights=Products_tuple_weightss[-2]
                print('Products_tuple_weights----------------------------',Products_tuple_weights)
                ans['DND']=Products_tuple_weights
            total=0
            for key,value in ans.items():
                total=total+value
            ans['BASE OIL 150']=100-total
            print(ans)
            try:
                Products.objects.filter(name=product_name).update(raw_materials_percentage=ans)
            except:
                print('error in updating value')

        products=list(Products.objects.values_list('name', flat=True))
        for product_name in products:
            product = Products.objects.get(name=product_name)
            raw_materials_percentage = product.raw_materials_percentage
            ans=eval(raw_materials_percentage)
            total=0
            for key, value in ans.items():
                print(key)
                rawproduct=RawProduct.objects.get(name=key)
                rawproduct_price=rawproduct.price
                total_rawproduct_price=float((value * 0.001) / 100)*float(rawproduct_price)
                total+=total_rawproduct_price
            print(total)
            try:
                sales_entry = Sales.objects.get(name=product_name)
                # If a record with the given name exists, update its fields
                sales_entry.price_per_kg = total

                # pdf field needs to be uncommented
                # sales_entry.pdf_blob = 'encoded pdf'.encode('utf-8')
                
                sales_entry.save()
            except Sales.DoesNotExist:
                # If a record with the given name does not exist, create a new one
                # Sales.objects.create(name=product_name, price_per_kg=total, pdf_blob='encoded pdf'.encode('utf-8'))
                Sales.objects.create(name=product_name, price_per_kg=total)
        return HttpResponse('Done')

class CreateBatchSheetView(APIView):
    # permission_classes = [IsAuthenticated]
    def post(self, request):
        product_name = request.data.get('product_name')
        quantity = request.data.get('quantity')
        pdf=request.data.get('pdf')
        product = Products.objects.get(name=product_name)
        raw_materials_percentage = product.raw_materials_percentage
        ans=eval(raw_materials_percentage)
        weights=[]
        print(ans)

        for key, value in ans.items():
            rawproduct_weight=round((value * quantity) / 100,4)
            weights.append(rawproduct_weight)
            # ans[key] = (value * quantity) / 100

        # weights = [float(weight.replace('[', '').replace(']', '')) * quantity for weight in product.weights.split(',')]
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


class SalesListView(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Sales.objects.all()
    serializer_class = SalesSerializer