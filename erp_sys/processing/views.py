from datetime import datetime
from rest_framework import generics,status
from rest_framework.response import Response
from .serializer import ProductsSerializer,SalesSerializer,ProductSpecsSerializer
from .models import Products,ProductsSpecs,Sales
from RawProducts.models import RawProduct
from rest_framework.views import APIView
from fpdf import FPDF
from io import BytesIO
from django.http import HttpResponse
from decimal import Decimal
from accounts.permissions import IsAdmin,IsSalesTeam


class ProductCreateView(generics.CreateAPIView):
    # permission_classes = [IsAdmin]
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

class ProductListView(generics.ListAPIView):
    # permission_classes = [IsAdmin]
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

class ProductDeleteView(generics.DestroyAPIView):
    # permission_classes = [IsAdmin]
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

class UpdateProductSpecsView(generics.CreateAPIView):
    # permission_classes= [IsAdmin]
    queryset= ProductsSpecs.objects.all()
    serializer_class = ProductSpecsSerializer

class UpdateProductTableView(APIView):
    def post(self,request):
        c300=request.data.get('C300_content')
        print('C300 ka percentage itna hai -> ',c300)
        products=list(Products.objects.values_list('name', flat=True))
        for product_name in products:
            try:
                product = Products.objects.get(name=product_name)
            except Products.DoesNotExist:
                return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

            try:
                product = Products.objects.get(name=product_name)
                raw_materials = product.raw_materials.split(',')  # Assuming raw materials are comma-separated
            except Products.DoesNotExist:
                raw_materials = []
            raw_materials = [element.strip('[] ') for element in raw_materials]
            ProductsSpecs_tuple = ProductsSpecs.objects.get(name=product_name)

            ans={value:0 for value in raw_materials}
            ans['TBN']=0.00
            print('Product : ',product_name)
            if('A.O.1' in raw_materials):
                RawProduct_tuple = RawProduct.objects.get(name='A.O.1')
                ans['A.O.1']=float((ProductsSpecs_tuple.zinc_content/RawProduct_tuple.zinc_content)*100)
                ans['TBN']=ans['TBN']+(float(RawProduct_tuple.TBN_content)*ans['A.O.1'])
                print("---------",ans['TBN'])
            if('A.O.2' in raw_materials):
                RawProduct_tuple = RawProduct.objects.get(name='A.O.2')
                ans['A.O.2']=float((ProductsSpecs_tuple.zinc_content/RawProduct_tuple.zinc_content)*100)
                ans['TBN']+=(float(RawProduct_tuple.TBN_content)*ans['A.O.2'])
                print("---------",ans['TBN'])
            if('DISPERSANT 1' in raw_materials):
                RawProduct_tuple = RawProduct.objects.get(name='DISPERSANT 1')
                ans['DISPERSANT 1']=float((ProductsSpecs_tuple.nitrogen_content/RawProduct_tuple.nitrogen_content)*100)
                ans['TBN']+=(float(RawProduct_tuple.TBN_content)*ans['DISPERSANT 1'])
                print("---------",ans['TBN'])
            if('DISPERSANT 2' in raw_materials):
                RawProduct_tuple = RawProduct.objects.get(name='DISPERSANT 2')
                ans['DISPERSANT 2']=float((ProductsSpecs_tuple.nitrogen_content/RawProduct_tuple.nitrogen_content)*100)
                ans['TBN']=ans['TBN']+(float(RawProduct_tuple.TBN_content)*ans['DISPERSANT 2'])
                print("---------",ans['TBN'])
            if('MODTC' in raw_materials):
                RawProduct_tuple = RawProduct.objects.get(name='MODTC')
                ans['MODTC']=float((ProductsSpecs_tuple.moly_content/RawProduct_tuple.moly_content)*100)
                ans['TBN']=ans['TBN']+(float(RawProduct_tuple.TBN_content)*ans['MODTC'])
                print("---------",ans['TBN'])
            if('C300' in raw_materials):
                ans['C300']=float(c300)
                RawProduct_tuple = RawProduct.objects.get(name='C300')
                ans['TBN']=ans['TBN']+(float(RawProduct_tuple.TBN_content)*ans['C300'])
                print("---------",ans['TBN'])
            if('PH250' in raw_materials):
                Products_tuple= Products.objects.get(name=product_name)
                RawProduct_tuple = RawProduct.objects.get(name='PH250')
                Product_fixed_percentage=eval(Products_tuple.fixed_percentages)
                Ph250_fixed=Product_fixed_percentage['PH250']
                ans['PH250']=Ph250_fixed
                print('TBN PH250 value ---------------------',RawProduct_tuple.TBN_content)
                ans['TBN']=ans['TBN']+(float(RawProduct_tuple.TBN_content)*ans['PH250'])
                print("---------",ans['TBN'])
            if('A.FOAM' in raw_materials):
                ans['A.FOAM']=0.2
                RawProduct_tuple = RawProduct.objects.get(name='A.FOAM')
                ans['TBN']=ans['TBN']+(float(RawProduct_tuple.TBN_content)*ans['A.FOAM'])
                print("---------",ans['TBN'])
            if('DND' in raw_materials):
                Products_tuple= Products.objects.get(name=product_name)
                Product_fixed_percentage=eval(Products_tuple.fixed_percentages)
                DND_fixed=Product_fixed_percentage['DND']
                ans['DND']=DND_fixed
                ans['TBN']=ans['TBN']+(float(RawProduct_tuple.TBN_content)*ans['DND'])
                print("---------",ans['TBN'])

            if('C400' in raw_materials):
                RawProduct_tuple = RawProduct.objects.get(name='C400')
                ans['C400']=((float(ProductsSpecs_tuple.TBN_content)-float(ans['TBN']/100))/float(RawProduct_tuple.TBN_content))*100
                ans['TBN']+=ans['C400']*float(RawProduct_tuple.TBN_content)
                print("---------",ans['TBN'])


                # Products_tuple= Products.objects.get(name=product_name)
                # RawProduct_tuple = RawProduct.objects.get(name='PH250')
                # Product_fixed_percentage=eval(Products_tuple.fixed_percentages)
                # Ph250_fixed=Product_fixed_percentage['PH250']
                # a=float(ProductsSpecs_tuple.calcium_content)-((float(Ph250_fixed)*float(RawProduct_tuple.calcium_content))/100)
                


                # RawProduct_tuple2 = RawProduct.objects.get(name='C400')
                # print('RawProduct_tuple2.calcium_content',RawProduct_tuple2.calcium_content)
                # batch_c400=((a)/float(RawProduct_tuple2.calcium_content))*100
                # ans['C400']=batch_c400


            total=0
            for key,value in ans.items():
                if(key!='TBN'):
                    total=total+float(value)
            ans['BASE OIL 150']=100-total

            ans['TBN']=ans['TBN']/100

            try:
                Products.objects.filter(name=product_name).update(raw_materials_percentage=ans)
            except:
                print('error in updating value')

        # products=list(Products.objects.values_list('name', flat=True))
        # for product_name in products:
        #     product = Products.objects.get(name=product_name)
        #     raw_materials_percentage = product.raw_materials_percentage
        #     ans=eval(raw_materials_percentage)
        #     print(f'{product_name}:{ans}')
        #     total=0
        #     for key, value in ans.items():
        #         print(key)
        #         rawproduct=RawProduct.objects.get(name=key)
        #         rawproduct_price=rawproduct.price
        #         total_rawproduct_price=float((value *float(rawproduct_price)) / 100)
        #         total+=total_rawproduct_price
        #     print(total)
        #     try:
        #         sales_entry = Sales.objects.get(name=product_name)
        #         # If a record with the given name exists, update its fields
        #         sales_entry.price_per_kg = total

        #         # pdf field needs to be uncommented
        #         # sales_entry.pdf_blob = 'encoded pdf'.encode('utf-8')
                
        #         sales_entry.save()
        #     except Sales.DoesNotExist:
        #         # If a record with the given name does not exist, create a new one
        #         # Sales.objects.create(name=product_name, price_per_kg=total, pdf_blob='encoded pdf'.encode('utf-8'))
        #         Sales.objects.create(name=product_name, price_per_kg=total)
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

        batchsheet_content_dict=dict()

        for key, value in ans.items():
            if(key!='TBN'):
                rawproduct_weight=round((value * quantity)/100,4)
                weights.append(rawproduct_weight)
                batchsheet_content_dict[key]=rawproduct_weight
                # ans[key] = (value * quantity) / 100
            else:
                weights.append(value)
                batchsheet_content_dict[key]=value

        # weights = [float(weight.replace('[', '').replace(']', '')) * quantity for weight in product.weights.split(',')]
        raw_materials = product.raw_materials.split(',')
        sequences = product.sequences.split(',')

        ProductsSpecs_tuple = ProductsSpecs.objects.get(name=product_name)
        expected_table_utility_dict=dict()
            





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
    permission_classes = [IsAdmin | IsSalesTeam]
    queryset = Sales.objects.all()
    serializer_class = SalesSerializer