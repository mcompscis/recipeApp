from django.db import models
from django.conf import settings

class Cuisine(models.Model):
    cuisine_id = models.AutoField(primary_key=True)
    cuisine_name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'Cuisine'


class Ingredient(models.Model):
    ingredient_id = models.AutoField(primary_key=True)
    ingredient_name = models.TextField()

    class Meta:
        managed = False
        db_table = 'Ingredient'


class Recipe(models.Model):
    recipe_id = models.AutoField(primary_key=True)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, models.DO_NOTHING)
    recipe_name = models.CharField(max_length=255)
    serves = models.IntegerField()
    date_submitted = models.DateField()
    cuisine = models.ForeignKey(Cuisine, models.DO_NOTHING, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    recipe_text = models.TextField()
    calories = models.FloatField(blank=True, null=True)
    avg_rating = models.FloatField(blank=True, null=True)
    time_to_prepare = models.IntegerField(blank=True, null=True)
    num_ratings = models.IntegerField()
    img_url = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Recipe'


class Interaction(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, models.DO_NOTHING, primary_key=True)
    recipe = models.ForeignKey(Recipe, models.DO_NOTHING)
    interaction_date = models.DateField()
    rating = models.FloatField(blank=True, null=True)
    review = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Interaction'
        unique_together = (('user', 'recipe'),)


class Recipeingredient(models.Model):
    recipe = models.OneToOneField(Recipe, models.DO_NOTHING, primary_key=True)
    ingredient = models.ForeignKey(Ingredient, models.DO_NOTHING)
    quantity = models.FloatField(blank=True, null=True)
    measurement_unit = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'RecipeIngredient'
        unique_together = (('recipe', 'ingredient'),)


class Tag(models.Model):
    tag_id = models.AutoField(primary_key=True)
    tag_text = models.TextField()

    class Meta:
        managed = False
        db_table = 'Tag'


class Recipetag(models.Model):
    recipe = models.OneToOneField(Recipe, models.DO_NOTHING, primary_key=True)
    tag = models.ForeignKey(Tag, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'RecipeTag'
        unique_together = (('recipe', 'tag'),)
