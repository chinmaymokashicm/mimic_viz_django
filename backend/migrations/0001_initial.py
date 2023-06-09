# Generated by Django 4.1.9 on 2023-05-15 03:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Admission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('module', models.CharField(max_length=255)),
                ('table', models.CharField(max_length=255)),
                ('subject_id', models.IntegerField()),
                ('data', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hadm_ids', models.JSONField()),
                ('hadm', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject_id', models.IntegerField()),
                ('gender', models.CharField(max_length=1)),
                ('anchor_age', models.IntegerField()),
                ('anchor_year', models.IntegerField()),
                ('anchor_year_group', models.CharField(max_length=255)),
                ('dod', models.DateTimeField(blank=True, null=True)),
            ],
        ),
    ]
