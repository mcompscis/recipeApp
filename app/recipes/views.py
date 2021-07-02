from django.http import HttpResponse, JsonResponse
from setup_tables.query_manager import exec_query
import os

from rest_framework.response import Response

from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework import status, permissions

class TopFiveAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        queryPath = os.path.join(os.path.dirname( __file__ ), '..', 'milestone_1_queries/get_top_recipes.sql')
        with open(queryPath, 'r') as file:
            queryText = file.read()
        return JsonResponse(exec_query(queryText), safe=False)

class RecipeDetailAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, pk):
        queryPath = os.path.join(os.path.dirname( __file__ ), '..', 'milestone_1_queries/return_specific_recipe_info.sql')
        with open(queryPath, 'r') as file:
            queryText = file.read()
        return JsonResponse(exec_query(queryText, {'pk': pk}), safe=False)
