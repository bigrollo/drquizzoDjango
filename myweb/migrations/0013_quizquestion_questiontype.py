# Generated by Django 3.0.8 on 2020-08-16 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myweb', '0012_auto_20200803_1911'),
    ]

    operations = [
        migrations.AddField(
            model_name='quizquestion',
            name='questionType',
            field=models.CharField(default='None', max_length=10),
        ),
    ]