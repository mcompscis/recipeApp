from django.db import models

# Create your models here.
class Recipe(models.Model):
    #recipe_id = models.IntegerField(primary_key=True)
    recipe_name = models.CharField(max_length=100)
    serves = models.PositiveIntegerField()
    date_submitted = models.DateTimeField(auto_now_add = True)
    description = models.TextField()
    recipe_text = models.TextField()
    calories = models.FloatField()
    avg_rating = models.FloatField()
    time_to_prepare = models.FloatField()
    num_ratings = models.PositiveIntegerField()
    img_url = models.URLField()

    '''
    class Meta:
        managed = False
        db_table = 'Recipe'
    '''