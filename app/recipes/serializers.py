from rest_framework import serializers
from recipes.models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    creator_id = serializers.IntegerField()
    recipe_name = serializers.CharField(max_length=100)
    serves = serializers.IntegerField()
    cuisine_id = serializers.IntegerField()
    date_submitted = serializers.DateTimeField()
    description = serializers.CharField()
    calories = serializers.FloatField()
    avg_rating = serializers.FloatField()
    time_to_prepare = serializers.FloatField()
    num_ratings = serializers.IntegerField()
    img_url = serializers.URLField()
    #recipe_text = models.TextField()
    class Meta:
        model = Recipe
        fields = fields = ['creator_id', 
                            'recipe_name', 
                            'serves', 
                            'cuisine_id', 
                            'date_submitted', 
                            'description', 
                            'calories', 
                            'avg_rating', 
                            'time_to_prepare', 
                            'num_ratings', 
                            'img_url' 
                            ]
