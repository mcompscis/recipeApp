from django.http import HttpResponse, JsonResponse
from setup_tables.query_manager import exec_query
import os
from datetime import datetime
from rest_framework.response import Response
import math

from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework import (status, 
                            permissions,
                            generics,
                            )

from rest_framework.parsers import JSONParser

limit = 48

class TopFiveAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        queryPath = os.path.join(os.path.dirname( __file__ ), 'recipe_queries/get_top_recipes.sql')
        with open(queryPath, 'r') as file:
            queryText = file.read()
        return JsonResponse(exec_query(queryText), safe=False)

class RecipeDetailAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, pk):
        queryPath = os.path.join(os.path.dirname( __file__ ), 'recipe_queries/return_specific_recipe_info.sql')
        with open(queryPath, 'r') as file:
            queryText = file.read()
        return JsonResponse(exec_query(queryText, {'pk': pk}), safe=False)

class GetRecipesAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        page_num = request.query_params.get('page')
        page_num = int(page_num[:-1] if "/" == page_num[-1] else page_num) if page_num else 1
        query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/get_n_recipes.sql')
        with open(query_path, 'r') as file:
            query_text = file.read()
        offset = (page_num - 1) * limit
        return JsonResponse(exec_query(query_text, {'offset_val': offset, 'limit_val': limit}), safe=False)

class GetRecipeAmountAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/get_num_recipes.sql')
        with open(query_path, 'r') as file:
            query_text = file.read()
        exec1 = exec_query(query_text)
        return JsonResponse({"num_pages": math.ceil(float(exec1["CNT"]/limit))}, safe=False)

class GetRecipeReviewsAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        page_num = request.query_params.get('page')
        recipe_id = request.query_params.get('recipe_id')
        page_num = int(page_num[:-1] if "/" == page_num[-1] else page_num) if page_num else 1
        query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/get_reviews.sql')
        with open(query_path, 'r') as file:
            query_text = file.read()
        offset = (page_num - 1) * limit

        exec = exec_query(query_text, {'recipe_id': recipe_id, 'offset_val': offset, 'limit_val': limit})
        return JsonResponse(exec, safe=False)


class SearchRecipeAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        recipe_name = request.query_params.get("recipe_name")
        page_num = request.query_params.get('page')
        page_num = int(page_num[:-1] if "/" == page_num[-1] else page_num) if page_num else 1
        recipe_name = recipe_name[:-1] if "/" == recipe_name[-1] else recipe_name
        get_num_recipes_query_path = os.path.join(os.path.dirname(__file__), 
                                                  'recipe_queries/get_num_recipes_with_recipe_name.sql')
        search_recipes_query_path = os.path.join(os.path.dirname(__file__), 
                                                       'recipe_queries/search_recipe_name.sql')
        with open(get_num_recipes_query_path, 'r') as file:
            get_num_recipes_query = file.read()
        with open(search_recipes_query_path, 'r') as file:
            search_recipes_query = file.read()
        offset = (page_num - 1) * limit
        exec1 = exec_query(get_num_recipes_query, 
                           {'recipe_name': recipe_name})
        searched_results = exec_query(search_recipes_query, 
                                      {'recipe_name': recipe_name, 
                                       'offset_val': offset, 
                                       'limit_val': limit})
        return JsonResponse({"key_results": searched_results,
                             "num_pages": math.ceil(float(exec1["CNT"]/limit))}, safe=False)

class CreateRecipeAPIView(APIView):

    def post(self, request, format="json"):
        data = JSONParser().parse(request)

        #Inserting Ingredients into Ingredient table if not exists
        recipe_name = data["recipe_name"]
        print(request.user.user_id)
        ingredient_names = data["ingredient_names"]
        if not ingredient_names:
            print("Ingredients is null")
        quantities = data["quantities"]
        measurement_units = data["measurement_units"]
        check_ingr_query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/check_ingredients.sql')
        insert_ingr_query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/insert_ingredients.sql')

        #Creating recipe in recipe table and returning recipe_id
        create_recipe_query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/create_recipe.sql')
        with open(create_recipe_query_path, 'r') as file:
            create_recipe_query = file.read()
        
        create_recipe_fields = {'creator_id': request.user.user_id, 
                                'recipe_name': data['recipe_name'],
                                'serves': data['serves'],
                                'date_submitted': datetime.today().strftime("%Y-%m-%d"),
                                'cuisine_name': data['cuisine_name'],
                                'description': data['description'],
                                'recipe_text': data['recipe_text'],
                                'calories': data['calories'],
                                'time_to_prepare': data['time_to_prepare'],
                                'img_url': data['img_url']}
        
        recipe_id = exec_query(create_recipe_query, create_recipe_fields, multi=True)
        print(f"Recipe_id is {recipe_id}")
        
        with open(check_ingr_query_path, 'r') as file:
            check_ingr_query = file.read()
        with open(insert_ingr_query_path, 'r') as file:
            insert_ingr_query = file.read()

        for ingredient_name in ingredient_names:
            if not exec_query(check_ingr_query,{'ingredient_name':ingredient_name})["DoesExist"]:
                exec_query(insert_ingr_query,{'ingredient_name':ingredient_name})

        #Inserting into RecipeIngredient table
        insert_recipe_ingr_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/insert_recipe_ingr.sql')
        with open(insert_recipe_ingr_path, 'r') as file:
            recipe_ingr = file.read()
        

        #TODO: Might be better to have this generate a sql query and execute that instead of opening multiple connections
        #Example -
        # for  ingredient,quantity,measurement in zip(ingredients,quantities,measurements):
        #    single_query = f"INSERT INTO RecipeIngredient(recipe_id,ingredient_id, quantity,measurement_unit) VALUES ({recipe_id}, (SELECT ingredient_id FROM   Ingredient WHERE  ingredient_name = {ingredient}, {quantity}, {measurement});\n"
        #    full_query += single_query
        # exec_query(full_query)
        #


        for ingredient_name,quantity,measurement_unit in zip(ingredient_names,quantities,measurement_units):
            exec_query(recipe_ingr, {'recipe_id':recipe_id,
                                     'ingredient_name':ingredient_name,
                                     'quantity':quantity,
                                     'measurement_unit':measurement_unit})

        
        #Inserting into Tag table if tag doesm't already exist
        tags = data["tags"]

        check_tag_query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/check_tag.sql')
        insert_tag_query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/insert_tag.sql')
        with open(check_tag_query_path, 'r') as file:
            check_tag_query = file.read()
        with open(insert_tag_query_path, 'r') as file:
            insert_tag_query = file.read()

        for tag in tags:
            if not exec_query(check_tag_query, {'tag_text':tag})["DoesExist"]:
                exec_query(insert_tag_query, {'tag_text':tag})

    
        #Inserting into RecipeTag table 
        insert_recipe_tag_query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/insert_recipe_tag.sql')
        with open(insert_recipe_tag_query_path, 'r') as file:
            insert_recipe_tag_query = file.read()

        for tag in tags:
            exec_query(insert_recipe_tag_query, {'recipe_id':recipe_id,'tag_text':tag})
 
        return JsonResponse({"new_recipe_id": recipe_id})