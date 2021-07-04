from django.http import HttpResponse, JsonResponse
from setup_tables.query_manager import exec_query
import os

from rest_framework.response import Response

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
        context = {
            "num_recipes": exec_query(query_text),
            "num_per_page": limit
        }
        return JsonResponse(context, safe=False)

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
        print(exec)
        return JsonResponse(exec, safe=False)


class CreateRecipeAPIView(APIView):

    def post(self, request, format="json"):
        # request.data
        data = JSONParser().parse(request)
        #try this if above doesn't work
        # data = json.loads(request)


        # 1. ingr, quantities, measurements = From data, get ingredients, quantities, measurements.
        # 2. recipe_id = Insert recipe, get back recipe_id
        # For ingr, quantity, measurement, each zip(ingr, quantities, measurements):
        #   ingr_id = run a query against it: it gets the ingredient_id of that ingredient (by searching or creating a new ingredient)
        #   run_query(insert_into_recipe_ingredient(ingredient_id, recipe_id, quantity, measurement))
        # tags = get tags from data
        # for tag in tags:
        #   tag_id = gets the tag_id of that tag or create new tag and return its id from the Tag Table
        #   insert into RecipeTag(recipe_id, tag_id)


        #Inserting Ingredients into Ingredient table if not exists
        recipe_name = data["recipe_name"]
        print(request.user.user_id)
        ingredients = data["ingredients"]
        if not ingredients:
            print("Ingredients is null")
        quantities = data["quantities"]
        measurement_units = data["measurement_units"]

        check_ingr_query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/check_ingredients.sql')
        insert_ingr_query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/insert_ingredients.sql')

        #Creating recipe in recipe table and returning recipe_id
        create_recipe_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/create_recipe.sql')
        with open(create_recipe_path, 'r') as file:
            create_recipe = file.read()
        
        # TODO: Do not expect a date_submitted entry for JSON, rather use current time in the backend for date_submitted field.
        create_recipe_fields = {'creator_id': request.user.user_id, 
                                'recipe_name': data['recipe_name'],
                                'serves': data['serves'],
                                'date_submitted': data['date_submitted'], 
                                'cuisine_name': data['cuisine_name'],
                                'description': data['description'],
                                'recipe_text': data['recipe_text'],
                                'calories': data['calories'],
                                'time_to_prepare': data['time_to_prepare'],
                                'img_url': data['img_url']}
        
        recipe_id = exec_query(create_recipe, data)
        print(recipe_id)
        
        with open(check_ingr_query_path, 'r') as file:
            check_ingr_query = file.read()
        with open(insert_ingr_query_path, 'r') as file:
            insert_ingr_query = file.read()

        for ingredient in ingredients:
            if not exec_query(check_ingr_query,{'ingr_val':ingredient}):
                exec_query(insert_ingr_query,{'ingr_val':ingredient})




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


        for ingredient,quantity,measurement in zip(ingredients,quantities,measurements):
            exec_query(recipe_ingr, {'recipe_id':recipe_id,'ingredient':ingredient,'quantity':quantity,'measurement':measurement})

        
        #Inserting into Tag table if tag doesm't already exist
        tags = data["tags"]

        check_tag_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/check_tag.sql')
        insert_tag_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/insert_tag.sql')
        with open(check_ingr_path, 'r') as file:
            check_tag = file.read()
        with open(insert_ingr_path, 'r') as file:
            insert_tag= file.read()



        for tag in tags:
            if not exec_query(check_tag,{'tag_text':tag} ):
                exec_query(insert_tag,{'tag_text':tag})

    
        #Inserting into RecipeTag table 
        insert_recipe_tag_path = os.path.join(os.path.dirname(file), 'recipe_queries/insert_recipe_tag.sql')
        with open(insert_recipe_tag_path, 'r') as file:
            recipe_tag = file.read()

        for tag in tags:
            exec_query(recipe_ingr, {'recipe_id':recipe_id,'tag_text':tag})
 

        #return JsonResponse(exec_query(query_text, data), safe=False)
        #TODO: figure out what to return
        return 