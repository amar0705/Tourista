from rest_framework import serializers
from .models import BlogPost, Property
from .models import Host


class YourModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'


class HostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Host
        fields = ['name', 'email', 'phone', 'password']


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ['property', 'host', 'location', 'property_type', 'total_bedrooms', 'price']
