from recipes.models import Recipe
from rest_framework import viewsets, permissions
from .serializers import RecipeSerializer

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    #queryset = Recipe.objects.raw("SELECT * FROM Recipe")
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = RecipeSerializer