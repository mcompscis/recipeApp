from django.urls import path, include
from . import views

urlpatterns = [
    path("top-five/", views.top_five),
    path("detail/<int:pk>/", views.recipe_detail),
]