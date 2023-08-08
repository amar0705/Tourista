# Generated by Django 4.2.3 on 2023-08-07 17:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('djangoProject', '0003_guest'),
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_status', models.CharField(max_length=200)),
                ('rooms_booked', models.IntegerField()),
                ('people', models.IntegerField()),
                ('stay_status', models.CharField(max_length=200)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('total_amount', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('guest', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='djangoProject.guest')),
                ('property', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='djangoProject.property')),
            ],
        ),
    ]
