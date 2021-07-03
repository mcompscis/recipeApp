from django.urls import path, include
from . import views

urlpatterns = [
    path("top-five/", views.TopFiveAPIView.as_view()),
    path("detail/<int:pk>/", views.RecipeDetailAPIView.as_view()),
    path("get_recipes/<int:offset>-<int:limit>/", views.GetRecipesAPIView.as_view()),
]