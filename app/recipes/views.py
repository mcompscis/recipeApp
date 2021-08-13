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
import json

from django.core.files.storage import default_storage
from datetime import datetime


s3_bucket = "recipefy-images"



limit = 48

def convert_lst_of_str_to_str_tuple(lst):
    """
    Converts a list of strings into a string representing the tuple(list(str))

    Examples:
    Input: ["a", "b"], Output: "('a', 'b')"
    Input: ["a"], Output: "('a')"
    
    This function is used for SQL queries with WHERE IN and WHERE NOT IN
    when a list of strings is needed to be passed to the SQL query
    """
    
    output = str(tuple(lst))
    output = output if (output[-2] != ",") else output[:-2] + ")"
    return output
    
class TopFiveAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        queryPath = os.path.join(os.path.dirname( __file__ ), 'recipe_queries/get_top_recipes.sql')
        with open(queryPath, 'r') as file:
            queryText = file.read()
        return JsonResponse(exec_query(queryText), safe=False)

class GetRecipeDetailAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, pk):
        queryPath = os.path.join(os.path.dirname( __file__ ), 'recipe_queries/return_specific_recipe_info.sql')
        with open(queryPath, 'r') as file:
            queryText = file.read()
        result = exec_query(queryText, {'pk': pk})
        print(result)
        return JsonResponse(result, safe=False)

class GetRecipesAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        page_num = request.query_params.get('page')
        page_num = int(page_num[:-1] if "/" == page_num[-1] else page_num) if page_num else 1
        query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/get_n_recipes.sql')
        with open(query_path, 'r') as file:
            query_text = file.read()
        offset = (page_num - 1) * limit
        recipes = exec_query(query_text, {'offset_val': offset, 'limit_val': limit})

        query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/get_num_recipes.sql')
        with open(query_path, 'r') as file:
            query_text = file.read()
        numRecipes = exec_query(query_text)

        return JsonResponse({"num_pages":  math.ceil(float(numRecipes["CNT"]/limit)),
                             "recipes": recipes} , safe=False)

class GetRecipeAmountAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/get_num_recipes.sql')
        with open(query_path, 'r') as file:
            query_text = file.read()
        exec1 = exec_query(query_text)
        return JsonResponse({"num_pages": math.ceil(float(exec1["CNT"]/limit)),}, safe=False)


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
        if (type(searched_results) == dict):
            searched_results = [searched_results]
        return JsonResponse({"key_results": searched_results,
                             "num_pages": math.ceil(float(exec1["CNT"]/limit))}, safe=False)


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


class AdvancedSearchAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        page_num = request.query_params.get('page')
        page_num = int(page_num[:-1] if "/" == page_num[-1] else page_num) if page_num else 1
        included_ingr_lst = ["random"]
        excluded_ingr_lst = ["random"]
        is_included_ingr_lst_null = None
        is_excluded_ingr_lst_null = None
        is_recipe_name_null = None
        included_ingredients = request.query_params.get('included_ingredients')
        excluded_ingredients = request.query_params.get('excluded_ingredients')
        recipe_name = request.query_params.get("recipe_name")
        tags_str = "('random')"
        cuisines_str = "('random')"
        is_tag_query_param_null = None
        is_cuisine_query_param_null = None
        tags_query_param = request.query_params.get('tags')
        cuisines_query_param = request.query_params.get('cuisines')
        
        if tags_query_param:
            tags_lst = tags_query_param.split(",")
            tags_str = convert_lst_of_str_to_str_tuple(tags_lst)
            is_tag_query_param_null = "N"

        if cuisines_query_param:
            cuisines_lst = cuisines_query_param.split(",")
            cuisines_str = convert_lst_of_str_to_str_tuple(cuisines_lst)
            is_cuisine_query_param_null = "N"
        
        if included_ingredients:
            included_ingr_lst = included_ingredients.split(",")
            is_included_ingr_lst_null = "N"
        
        if excluded_ingredients:
            excluded_ingr_lst = excluded_ingredients.split(",")
            is_excluded_ingr_lst_null = "N"
        
        if recipe_name:
            is_recipe_name_null = "N"
            
        return self.query_v1(page_num, 
                             included_ingr_lst, 
                             excluded_ingr_lst, 
                            is_included_ingr_lst_null, 
                            is_excluded_ingr_lst_null,
                            tags_str,
                            cuisines_str,
                            is_tag_query_param_null, 
                            is_cuisine_query_param_null, 
                            recipe_name,
                            is_recipe_name_null)
    

    def query_v1(self, page_num, included_ingr_lst, excluded_ingr_lst, 
                 is_included_ingr_lst_null, is_excluded_ingr_lst_null,
                 tags_str, cuisines_str, is_tag_query_param_null, 
                 is_cuisine_query_param_null, recipe_name, is_recipe_name_null):
        
        included_ingr_str = " ".join(included_ingr_lst)
        excluded_ingr_str = " ".join(excluded_ingr_lst)
        
        get_num_recipes_query_path = os.path.join(os.path.dirname(__file__), 
                                                  'recipe_queries/get_num_results_from_advanced_search.sql')
        advanced_search_query_path = os.path.join(os.path.dirname(__file__), 
                                                       'recipe_queries/advanced_search_query.sql')
        with open(get_num_recipes_query_path, 'r') as file:
            get_num_recipes_from_advanced_search_query = file.read()
            
        with open(advanced_search_query_path, 'r') as file:
            advanced_search_query = file.read()
        
        get_num_recipes_from_advanced_search_query = get_num_recipes_from_advanced_search_query.replace(
            "%(tag_texts)s", tags_str
            ).replace("%(cuisine_names)s", cuisines_str)

        advanced_search_query = advanced_search_query.replace(
            "%(tag_texts)s", tags_str
            ).replace("%(cuisine_names)s", cuisines_str)

        offset = (page_num - 1) * limit
        query_params = {
            "is_included_ingr_lst_null": is_included_ingr_lst_null,
            "is_excluded_ingr_lst_null": is_excluded_ingr_lst_null,
            'include_ingredients': included_ingr_str,
            "exclude_ingredients": excluded_ingr_str,
            "is_tag_query_param_null": is_tag_query_param_null,
            "is_cuisine_query_param_null": is_cuisine_query_param_null,
            "recipe_name": recipe_name,
            "is_recipe_name_null": is_recipe_name_null,
            'offset_val': offset, 
            'limit_val': limit
            }

        exec1 = exec_query(get_num_recipes_from_advanced_search_query, 
                           query_params)
        
        searched_results = exec_query(advanced_search_query, 
                                      query_params)
        if (type(searched_results) == dict):
            searched_results = [searched_results]
        
        return JsonResponse({"key_results": searched_results,
                             "num_pages": math.ceil(float(exec1["CNT"]/limit)),
                             "num_results": exec1["CNT"]}, safe=False)

    def query_v2(self, page_num, included_ingr_lst, excluded_ingr_lst, 
                 is_included_ingr_lst_null, is_excluded_ingr_lst_null,
                 tags_str, cuisines_str, is_tag_query_param_null, is_cuisine_query_param_null):

        included_ingr_str = convert_lst_of_str_to_str_tuple(included_ingr_lst)  
        excluded_ingr_str = convert_lst_of_str_to_str_tuple(excluded_ingr_lst)

        query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/advanced_search_query_v2.sql')
        with open(query_path, 'r') as file:
            query_text = file.read()
            
        query_text = query_text.replace("%(tag_texts)s", tags_str)
        query_text = query_text.replace("%(cuisine_names)s", cuisines_str)
        query_text = query_text.replace("%(include_ingredients)s", included_ingr_str)
        query_text = query_text.replace("%(exclude_ingredients)s", excluded_ingr_str)
            
        offset = (page_num - 1) * limit
        exec = exec_query(query_text, {
            "is_included_ingr_lst_null": is_included_ingr_lst_null,
            "is_excluded_ingr_lst_null": is_excluded_ingr_lst_null,
            "is_tag_query_param_null": is_tag_query_param_null,
            "is_cuisine_query_param_null": is_cuisine_query_param_null,
            'offset_val': offset, 'limit_val': limit})
        return exec


class GetCuisinesAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/get_cuisines.sql')
        with open(query_path, 'r') as file:
            query_text = file.read()
        
        exec = exec_query(query_text)
        return JsonResponse(exec, safe=False)

class GetTagsAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/get_tags.sql')
        with open(query_path, 'r') as file:
            query_text = file.read()
        
        exec = exec_query(query_text)
        return JsonResponse(exec, safe=False)

class GetIngredientsAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/get_ingredient_names.sql')
        with open(query_path, 'r') as file:
            query_text = file.read()
        
        exec = exec_query(query_text)
        return JsonResponse(exec, safe=False)

    
class SearchRecipeBasedOnCuisineAndTagsAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        page_num = request.query_params.get('page')
        page_num = int(page_num[:-1] if "/" == page_num[-1] else page_num) if page_num else 1
        tags_str = "(1)"
        cuisines_str = "(1)"
        is_tag_query_param_null = "Y"
        is_cuisine_query_param_null = "Y"
        tags_query_param = request.query_params.get('tags')
        cuisines_query_param = request.query_params.get('cuisines')
        
        if tags_query_param is not None:
            tags_lst = tags_query_param.split(",")
            tags_str = convert_lst_of_str_to_str_tuple(tags_lst)
            is_tag_query_param_null = "N"

        if cuisines_query_param is not None:
            cuisines_lst = cuisines_query_param.split(",")
            cuisines_str = convert_lst_of_str_to_str_tuple(cuisines_lst)
            is_cuisine_query_param_null = "N"
        
        query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/search_recipe_by_tags_and_cuisine.sql')
        with open(query_path, 'r') as file:
            query_text = file.read()
        
        query_text = query_text.replace("%(tag_texts)s", tags_str)
        query_text = query_text.replace("%(cuisine_names)s", cuisines_str)

        offset = (page_num - 1) * limit

        exec = exec_query(query_text, {'offset_val': offset, 'limit_val': limit,
                                       "is_tag_query_param_null": is_tag_query_param_null,
                                       "is_cuisine_query_param_null": is_cuisine_query_param_null})
        

        return JsonResponse(exec, safe=False)



class CreateRecipeAPIView(APIView):

    def post(self, request):
        print('Create recipe invoked')
        data = json.loads(request.data["data"])
        uploaded_file = request.FILES["file"]
        s3_file_name_prefix, s3_file_extension = str(uploaded_file).split(".")
        s3_file_name_prefix = s3_file_name_prefix + datetime.now().strftime("%d-%m-%Y-%H:%M:%S")
        s3_file_name = s3_file_name_prefix + f".{s3_file_extension}"

        # Uploading to S3
        with default_storage.open(s3_file_name, "wb+") as f:
            for chunk in uploaded_file.chunks():
                f.write(chunk)
            
        s3_url = f"https://{s3_bucket}.s3.amazonaws.com/{s3_file_name}"
        data["img_url"] = s3_url

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
    
    
class CreateInteractionAPIView(APIView):
    # To Create a rating or a review
    def post(self, request):
        data = JSONParser().parse(request)
        review = None
        if "review" in data.keys():
            review = data["review"]
        query_path = os.path.join(os.path.dirname(__file__), 'recipe_queries/create_interaction.sql')
        with open(query_path, 'r') as file:
            query_text = file.read()
        
        interaction_id = exec_query(query_text, {"user_id": request.user.user_id, 
                                "recipe_id": data["recipe_id"],
                                "interaction_date": datetime.today().strftime("%Y-%m-%d"),
                                "rating": data["rating"],
                                "review": review
                                }, multi=True)
        
        return JsonResponse({"new_interaction_id": interaction_id})
