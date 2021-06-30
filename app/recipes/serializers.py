from rest_framework import serializers
from .models import Cuisine, Ingredient, Recipe, Interaction, Recipeingredient, Tag, Recipetag,  

class CuisineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuisine
        fields = '__all__'


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'


class InteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interaction
        fields = '__all__'


class RecipeingredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipeingredient
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class RecipetagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipetag
        fields = '__all__'
