# In your_app/models.py
from django.db import models


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    summary = models.TextField()
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.title


class Host(models.Model):
    name = models.CharField(max_length=200)
    host_status = models.BooleanField(default=True)
    about = models.TextField()
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=200)
    phone = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.name


class Location(models.Model):
    state = models.TextField()
    city = models.TextField()

    def __str__(self):
        return self.city


class PropertyType(models.Model):
    name = models.TextField()

    def __str__(self):
        return self.name


class Property(models.Model):
    property = models.TextField()
    host = models.ForeignKey(Host, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    property_type = models.ForeignKey(PropertyType, on_delete=models.CASCADE)
    total_bedrooms = models.IntegerField()
    summary = models.TextField()
    address = models.TextField()
    price = models.IntegerField()
    hosted_since = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.property
