# Generated by Django 3.2.3 on 2021-06-28 03:30

import django.contrib.auth.validators
from django.db import migrations, models
import users.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('hashed_password', models.CharField(max_length=65)),
                ('avg_recipe_rating', models.FloatField(blank=True, null=True)),
                ('num_ratings_received', models.IntegerField()),
                ('num_recipes_created', models.IntegerField()),
            ],
            options={
                'db_table': 'SampleUser',
                'managed': True,
            },
            managers=[
                ('objects', users.models.AccountManager()),
            ],
        ),
    ]
