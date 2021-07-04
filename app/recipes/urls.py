from django.urls import path, include
from . import views

urlpatterns = [
    path("top-five/", views.TopFiveAPIView.as_view()),
    path("detail/<int:pk>/", views.RecipeDetailAPIView.as_view()),
    path("get-recipes/", views.GetRecipesAPIView.as_view()),
    path("amount/", views.GetRecipeAmountAPIView.as_view()),
    path("create-recipe/", views.CreateRecipeAPIView.as_view()),
]