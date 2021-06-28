from django.db import models
from django.conf import settings

class Samplecuisine(models.Model):
    cuisine_id = models.AutoField(primary_key=True)
    cuisine_name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'SampleCuisine'


class Sampleingredient(models.Model):
    ingredient_id = models.AutoField(primary_key=True)
    ingredient_name = models.TextField()

    class Meta:
        managed = False
        db_table = 'SampleIngredient'


class Samplerecipe(models.Model):
    recipe_id = models.AutoField(primary_key=True)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, models.DO_NOTHING)
    recipe_name = models.CharField(max_length=255)
    serves = models.IntegerField()
    date_submitted = models.DateField()
    cuisine = models.ForeignKey(Samplecuisine, models.DO_NOTHING, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    recipe_text = models.TextField()
    calories = models.FloatField(blank=True, null=True)
    avg_rating = models.FloatField(blank=True, null=True)
    time_to_prepare = models.IntegerField(blank=True, null=True)
    num_ratings = models.IntegerField()
    img_url = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'SampleRecipe'


class Sampleinteraction(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, models.DO_NOTHING, primary_key=True)
    recipe = models.ForeignKey('Samplerecipe', models.DO_NOTHING)
    interaction_date = models.DateField()
    rating = models.FloatField(blank=True, null=True)
    review = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'SampleInteraction'
        unique_together = (('user', 'recipe'),)


class Samplerecipeingredient(models.Model):
    recipe = models.OneToOneField(Samplerecipe, models.DO_NOTHING, primary_key=True)
    ingredient = models.ForeignKey(Sampleingredient, models.DO_NOTHING)
    quantity = models.FloatField(blank=True, null=True)
    measurement_type = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'SampleRecipeIngredient'
        unique_together = (('recipe', 'ingredient'),)


class Sampletag(models.Model):
    tag_id = models.AutoField(primary_key=True)
    tag_text = models.TextField()

    class Meta:
        managed = False
        db_table = 'SampleTag'


class Samplerecipetag(models.Model):
    recipe = models.OneToOneField(Samplerecipe, models.DO_NOTHING, primary_key=True)
    tag = models.ForeignKey('Sampletag', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'SampleRecipeTag'
        unique_together = (('recipe', 'tag'),)


class QueryTest(models.Model):
    column1 = models.AutoField(primary_key=True)
    column2 = models.IntegerField(blank=True, null=True)
    column3 = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'query_test'


class RecipesRecipe(models.Model):
    recipe_name = models.CharField(max_length=100)
    serves = models.PositiveIntegerField()
    date_submitted = models.DateTimeField()
    description = models.TextField()
    recipe_text = models.TextField()
    calories = models.FloatField()
    avg_rating = models.FloatField()
    time_to_prepare = models.FloatField()
    num_ratings = models.PositiveIntegerField()
    img_url = models.CharField(max_length=200)
    recipe_id = models.IntegerField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'recipes_recipe'

