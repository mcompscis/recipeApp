from django.urls import path, include
from . import views

urlpatterns = [
    path("top-five/", views.TopFiveAPIView.as_view()),
    path("detail/<int:pk>/", views.GetRecipeDetailAPIView.as_view()),
    path("get-recipes/", views.GetRecipesAPIView.as_view()),
    path("amount/", views.GetRecipeAmountAPIView.as_view()),
    path("create-recipe/", views.CreateRecipeAPIView.as_view()),
    path("get-reviews/", views.GetRecipeReviewsAPIView.as_view()),
    path("search-recipe/", views.SearchRecipeAPIView.as_view()),
    path("advanced-search", views.AdvancedSearchAPIView.as_view()),
    path("search-recipe-by-cuisines-tags/", views.SearchRecipeBasedOnCuisineAndTagsAPIView.as_view()),
    path("get-cuisines/", views.GetCuisinesAPIView.as_view()),
    path("get-tags/", views.GetTagsAPIView.as_view()),
    path("get-ingredients/", views.GetIngredientsAPIView.as_view()),
]