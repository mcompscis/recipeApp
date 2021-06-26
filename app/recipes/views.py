from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from setup_tables.query_manager import exec_query
import os

def top_five(request):
    queryPath = os.path.join(os.path.dirname( __file__ ), '..', 'milestone_1_queries/get_top_recipes.sql')
    with open(queryPath, 'r') as file:
        queryText = file.read()
    return JsonResponse(exec_query(queryText), safe=False)

def recipe_detail(request, pk):
    if request.method == 'GET':
        queryPath = os.path.join(os.path.dirname( __file__ ), '..', 'milestone_1_queries/return_specific_recipe_info.sql')
        with open(queryPath, 'r') as file:
            queryText = file.read()
        return JsonResponse(exec_query(queryText, [pk]), safe=False)
    elif request.method == 'POST':
        pass