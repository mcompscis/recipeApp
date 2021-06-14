#from recipes.models import Recipe
from rest_framework import viewsets, permissions
from .serializers import RecipeSerializer
from rest_framework.response import Response
from django.http import JsonResponse
import os

from setup_tables.query_manager import exec_query


class RecipeViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = RecipeSerializer

    def list(self, request):
        queryPath = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', 'milestone_1_queries/get_top_recipes.sql'))
        with open(queryPath, 'r') as file:
           queryText = file.read()
        return Response(exec_query(queryText))
    
    def create(self, request):
        return Response({"hello": "yes12345678"})

    def retrieve(self, request, pk=None):
        queryPath = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', 'milestone_1_queries/return_specific_recipe_info.sql'))
        with open(queryPath, 'r') as file:
           queryText = file.read()
        return Response(exec_query(queryText, [pk]))

    def update(self, request, pk=None):
        return Response({"hello": "UPDATE"})

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        return Response({"hello": "DELETE"})