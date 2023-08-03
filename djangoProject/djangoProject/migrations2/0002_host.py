# Generated by Django 4.2.3 on 2023-07-19 18:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djangoProject', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Host',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('host_status', models.BooleanField(default=True)),
                ('about', models.TextField()),
                ('email', models.EmailField(max_length=100)),
                ('password', models.CharField(max_length=200)),
                ('phone', models.IntegerField()),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
            ],
        ),
    ]