# your_app/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import BlogPost, Host
from .serializers import YourModelSerializer, HostSerializer
from .authentication import GetMethodTokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model


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
        email = request.data.get('email')
        password = request.data.get('password')

        if email and password:
            # Host = get_user_model()
            user_queryset = Host.objects.filter(email=email, password=password)
            if user_queryset.exists():
                # User is authenticated
                user = Host.objects.all()
                print(user, user_queryset)
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key, 'message': "LoggedIn"})
            else:
                return Response({'error': 'Invalid email or password.'}, status=400)
        else:
            return Response({'error': 'Both email and password are required.'}, status=400)
