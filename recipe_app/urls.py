from django.urls import path
from . import views

app_name = "recipe_app"

urlpatterns = [
        path("", views.homepage, name="homepage"),
]

