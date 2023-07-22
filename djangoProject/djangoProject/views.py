# your_app/views.py
import datetime
import jwt
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .authentication import GetMethodTokenAuthentication
from .models import BlogPost, Host, Property
from .serializers import YourModelSerializer, HostSerializer, PropertySerializer
from rest_framework.response import Response
from rest_framework.authentication import get_authorization_header



class YourModelAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = BlogPost.objects.all()
        serializer = YourModelSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = YourModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class HostAPIView(APIView):
    authentication_classes = [GetMethodTokenAuthentication]  # Use custom authentication for GET requests only
    permission_classes = []  # Add other permissions as needed

    def get(self, request):
        queryset = Host.objects.all()
        serializer = HostSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = HostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Successfully Added"}, status=201)
        return Response(serializer.errors, status=400)


class HostLoginAPIView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        data = Host.objects.filter(email=email).first()
        user = Host.objects.filter(email=email, password=password).exists()

        if not user:
            raise AuthenticationFailed('Incorrect Email or Password')
        else:
            payload = {
                'id': data.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                'iat': datetime.datetime.utcnow()
            }

            token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')

            response = Response()
            response.set_cookie(key='jwt', value=token, httponly=True)

            response.data = {
                'token': token
            }
            return response


# class HostLoginAPIView(APIView):
#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')
#         check_user = Host.objects.filter(email=email, password=password)
#         user = authenticate(username=email, password=password)
#         print(user, check_user.values()[0].get("id"))
#         if check_user.exists():
#             refresh = RefreshToken.for_user(check_user.values()[0])
#             access_token = str(refresh.access_token)
#
#             return Response({'access_token': access_token})
#         else:
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class HostPropertyAPIView(APIView):

    def get(self, request):
        print(request)
        auth_header = get_authorization_header(request).split()

        token = auth_header[0].decode('utf-8')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithm=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        property = Property.objects.all().filter(host=payload['id'])
        arrayData = []
        for i in property:
            _dict = {
                'id': i.id,
                'property': i.property,
                'host': i.host.id,
                'location': dict(id=i.location.id, state=i.location.state, city=i.location.city),
                'property_type': dict(id=i.property_type.id, name=i.property_type.name),
                'total_bedrooms': i.total_bedrooms,
                'summary': i.summary,
                'address': i.address,
                'price': i.price,
                'hosted_since': i.hosted_since,
                'created_at': i.created_at,
                'updated_at': i.updated_at
                # Add other fields as needed
            }
            arrayData.append(_dict)
        return Response({"data": arrayData}, status=201)

    def post(self, request):
        serializer = PropertySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Successfully Added"}, status=201)
        return Response(serializer.errors, status=400)
