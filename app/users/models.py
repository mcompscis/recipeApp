from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

class AccountManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username, hashed_password, avg_recipe_rating=None, num_ratings_received=0, num_recipes_created=0, **extra_fields):
        values = [username, hashed_password]
        field_value_map = dict(zip(self.model.REQUIRED_FIELDS, values))
        for field_name, value in field_value_map.items():
            if not value:
                raise ValueError('The {} value must be set'.format(field_name))

        user = self.model(username=username, 
                        hashed_password=hashed_password, 
                        num_ratings_received=num_ratings_received,
                        num_recipes_created=num_recipes_created,
                        avg_recipe_rating=avg_recipe_rating,
                         **extra_fields
                    )

        user.set_password(hashed_password)
        user.save(using=self._db)
        return user

    def create_user(self,username, hashed_password, avg_recipe_rating=None, num_ratings_received=0, num_recipes_created=0, **extra_fields):
        return self._create_user(username, hashed_password, avg_recipe_rating, num_ratings_received, num_recipes_created, **extra_fields)

    def create_superuser(self,username, hashed_password, avg_recipe_rating=None, num_ratings_received=0, num_recipes_created=0, **extra_fields):
        return self._create_user(username, hashed_password, avg_recipe_rating, num_ratings_received, num_recipes_created, **extra_fields)


class User(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    hashed_password = models.CharField(max_length=65) # TODO: should become password after repopulating tables
    avg_recipe_rating = models.FloatField(blank=True, null=True)
    num_ratings_received = models.IntegerField(null=False)
    num_recipes_created = models.IntegerField()

    password = None
    last_login = None
    groups = None
    user_permissions = None
    is_superuser = None
    first_name = None
    last_name = None
    email = None
    date_joined = None
    is_active = None
    is_staff = None

    objects = AccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['hashed_password', 'num_ratings_received', 'num_recipes_created']

    class Meta:
        managed = True
        db_table = 'SampleUser'
