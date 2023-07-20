from rest_framework import serializers
from .models import BlogPost
from .models import Host


class YourModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'


class HostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Host
        fields = ['name', 'email', 'phone', 'password']
