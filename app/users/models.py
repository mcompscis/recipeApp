from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    avg_recipe_rating = models.FloatField(null=True)
    num_ratings_received = models.IntegerField(null=False, default=0)
    num_recipes_created = models.IntegerField(null=False, default=0)

    class Meta:
        db_table = 'User'
