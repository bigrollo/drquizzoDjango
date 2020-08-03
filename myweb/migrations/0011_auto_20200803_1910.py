# Generated by Django 3.0.8 on 2020-08-03 23:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myweb', '0010_auto_20200721_1949'),
    ]

    operations = [
        migrations.CreateModel(
            name='Quizcats',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=120)),
            ],
        ),
        migrations.AddField(
            model_name='quiz',
            name='category',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]