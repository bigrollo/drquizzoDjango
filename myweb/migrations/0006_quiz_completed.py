# Generated by Django 3.0.8 on 2020-07-19 23:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myweb', '0005_star'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='completed',
            field=models.BooleanField(default=False),
        ),
    ]
