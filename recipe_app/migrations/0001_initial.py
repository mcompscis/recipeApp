# Generated by Django 3.2.3 on 2021-05-24 22:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SampleTable',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'sample_table',
                'managed': False,
            },
        ),
    ]
