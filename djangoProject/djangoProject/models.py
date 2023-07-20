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

    def __str__(self):
        return self.name
