# Generated by Django 4.2.3 on 2023-07-22 11:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('djangoProject', '0007_state_city'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='city',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='djangoProject.city'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='property',
            name='state',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='djangoProject.state'),
            preserve_default=False,
        ),
    ]
