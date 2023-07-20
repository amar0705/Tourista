# your_app/views.py
import datetime
import jwt
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .authentication import GetMethodTokenAuthentication
from .models import BlogPost, Host
from .serializers import YourModelSerializer, HostSerializer


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
