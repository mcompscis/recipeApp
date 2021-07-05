# cs348

[//]: # 'This read me is written in Markdown read with interpreter for best results '


Recipefy Web App

The app directory in this code repository contains all the main frontend and backend code.
The frontend was created in React and the frontend code sits in app/frontend directory.
The backend framework is Django. The Django project code sits in the app directory.
The recipeApp inside the app directory refers to the main Django project for this repository. The main Django project contains
an app. The recipes directory corresponds to a Django app part of the recipeApp project. This is where the main backend code
lies in.

To build with pipenv, run the following command inside the root directory

```bash
pipenv install
pipenv shell
```

Next, to build the React app, run the following command inside the root directory

```bash
npm install
npm run build
```

To run the Django application, run the following command inside the app directory:

```bash
python manage.py runserver
```

After starting the Django application, 2 API endpoints exist as of now:
GET localhost:8000/api/recipes/
GET localhost:8000/api/recipes/:pk

These will return JSON of all recipes in the database or specific detail about a recipe with a certain primary key.

Alternatively, navigate to localhost:8000 to view a list of the Top 5 recipes sorted by their average rating displayed through a react frontend.
This is the only frontend feature fully implemented as of now that connects to the backend and gets data from the database.

The test-sample.sql and test-sample.out files in the outermost directory contain our the SQL queries for 6 different features and the output of that sql script respectively. The app/milestone_1_queries directory contains individual SQL scripts for each of the 6 different features as well.

Inside the recipeApp directory, place the "db_credentials.json" file to get access to the AWS RDS MySQL database.

The sql scripts for creating the sample tables, populating them and dropping them are located in 'app\setup_tables\sql_scripts\'

- create_sample_tables.sql creates the empty tables for testing, it also sets up triggers for updating data based on user interaction with the webapp
- populate_sample_tables.sql populates the sample table with dummy data for testing
- drop_sample_tables.sql drops all samples tables

The 'app\setup_tables' directory contains python and bash files to deploy the above sql scripts, the python scripts use MySQL Connector to connect to the RDS MySQL instance and run the raw SQL scripts

- reset_tables.sh drops all the sample tables, creates them along with their triggers and re-populates them with testing data.
- create_tables.py creates the sample tables and triggers and can be run using 'python create_tables.py'
- drop_tables.py drops all sample tables and can be run using 'python drop_tables.py'
- populate_tables.py populates the sample tables with test data and can be run using 'python populate_tables.py'

## MILESTONE 2

### How to Generate the Production Dataset and Load it Into the Database

#### How to Generate Production Dataset

To generate the production dataset, we downloaded data on recipes scraped from Food.com through this [Kaggle Dataset link](https://www.kaggle.com/shuyangli94/food-com-recipes-and-user-interactions).

The files from the above link consisted of the following important CSV and Pickle files that we used: ingr_map.pkl (which contains the ingredients mapping to ingredient ids), RAW_interactions.csv (a raw table of ratings and reviews), RAW_recipes.csv (a raw tables of data on recipes), and PP_recipes.csv (which had recipes data with ingredient ids that corresponds to the mapping in ingr_map.pkl).

We used all these dataset files and used Python Jupyter Notebooks to extract, clean and transform many of these files into new CSVs using the Python Notebook[data_cleaning_and_transformation.ipynb](https://github.com/mcompscis/recipeApp/blob/main/app/setup_tables/data_cleaning_and_transformation.ipynb).

Some problems faced: 
1. There were no usernames for the users in the data downloaded from Kaggle.
2. There was no quantity, measurements and image urls for any of the recipes from the Dataset link.

Solutions for those problems:
1. We randomly created unique usernames for the users using the Python library names. The creation of the new user table through this random generation was done through this notebook [here](https://github.com/mcompscis/recipeApp/blob/main/app/setup_tables/create_user_tables_and_experiment_migration.ipynb).
2. We developed scraping the Python scripts [scrape_img_urls.py](https://github.com/mcompscis/recipeApp/blob/main/app/setup_tables/scrape_img_urls.py) and [scrape_recipe_measurements.py](https://github.com/mcompscis/recipeApp/blob/main/app/setup_tables/scrape_recipe_measurements.py) to scrape the columns data that we needed.


### How to Load Data into Database

The Python Jupyter Notebook used to load the data into the Database was [migrate_tables.ipynb](https://github.com/mcompscis/recipeApp/blob/main/app/setup_tables/migrate_tables.ipynb). We have also created a Python script called [populate_prod_tables.py](https://github.com/mcompscis/recipeApp/blob/main/app/setup_tables/populate_prod_tables.py) for it, but we have yet to fully test it.

In the migrate_tables.ipynb notebook and populate_prod_tables.py script, we took the transformed versions of the CSV files that were saved to disk from  [data_cleaning_and_transformation.ipynb](https://github.com/mcompscis/recipeApp/blob/main/app/setup_tables/data_cleaning_and_transformation.ipynb) and loaded these new CSV files as pandas DataFrames. Using SQLAlchemy, we opened a connection our MySQL Database and moved the data to the tables in the database using the to_sql method for DataFrames in pandas. 

### Three Implemented Features

The Features listed below are in reference to the Six features mentioned in the midterm document 

All currently implemented features require the frontend to make API requests to the Django backend which in turn executes the appropriate SQL queries.

The frontend is implemented in React and can be found in the [frontend](https://github.com/mcompscis/recipeApp/tree/main/app/frontend) directory

The backend follows the Django framework. The API routes and the backend logic implementation for each API route can be found in the `urls.py` files and `views.py` files for the respective Django apps. Currently, we have two Django apps: [recipes](https://github.com/mcompscis/recipeApp/tree/main/app/recipes) and [users](https://github.com/mcompscis/recipeApp/tree/main/app/users). The recipes app takes care of all routes that have to do with recipes (e.g. searching or creating recipes) whereas the users app takes care of user authentication using Django.

1. **Feature 1**: Users can create a new recipe so that all users of the application can see and search for this new recipe. The frontend sends a POST request to the backend (implemented in [recipe/views.py](https://github.com/mcompscis/recipeApp/blob/main/app/recipes/views.py)) containing all the details for recipe creation. <br>
The list of ingredients is checked to see if there are any ingredients not already in the Ingredients table. The new ingredients are then inserted into the Ingredients table.<br>
The following queries are used
    - [check_ingredients.sql](https://github.com/mcompscis/recipeApp/blob/main/app/recipes/recipe_queries/check_ingredients.sql)
    - [insert_ingredient.sql](https://github.com/mcompscis/recipeApp/blob/main/app/recipes/recipe_queries/insert_ingredients.sql)

    <br> The recipe is then inserted into the Recipe table via the following query
    - [create_recipe.sql](https://github.com/mcompscis/recipeApp/blob/main/app/recipes/recipe_queries/create_recipe.sql)  

    <br> The query above returns the recipe_id of the created recipe. The recipe_id is used to populate the RecipeIngredient Table that maps recipes to their ingredients along with the quantity and measurement unit of that ingredient.
The following query is used for this
    - [insert_recipe_ingr.sql](https://github.com/mcompscis/recipeApp/blob/main/app/recipes/recipe_queries/insert_recipe_ingr.sql)

    <br>The tags for the recipe are then checked to see if there are any new tags. New tags are inserted into the Tags table. The following queries are used
    - [check_tag.sql](https://github.com/mcompscis/recipeApp/blob/main/app/recipes/recipe_queries/check_tag.sql)
    - [insert_tag.sql](https://github.com/mcompscis/recipeApp/blob/main/app/recipes/recipe_queries/insert_tag.sql)

    <br> The relationship between the recipe_id and the tags are then recorded in the RecipeTags table using the following query  
    - [insert_recipe_tag.sql](https://github.com/mcompscis/recipeApp/blob/main/app/recipes/recipe_queries/insert_recipe_tag.sql)

  
2. **Feature 3**: Return the top-rated recipes on the application’s homepage by ordering by a weighted average rating in a descending order. This feature is useful to display it on the homepage of the application for users to see the top recipes they should try out.   
The backend passes ‘limit’ and ‘offset’ variables that specify how many recipes should be displayed on one page and which recipe to start on in the next page.  
The following SQL query is used to implement this feature-
    - [get_n_recipes.sql](https://github.com/mcompscis/recipeApp/blob/main/app/recipes/recipe_queries/get_n_recipes.sql)

3. **Feature 4**: Users can view a webpage that contains all the details of a recipe such as the recipe methodology, description of the recipe, the cuisine, tags and ingredients associated with the recipe.  The frontend passes a recipe_id to the backend based on the recipe hyperlink that the user clicks.   The following query displays the details of a recipe that correspond to a particular recipe_id  
    - [return_specific_recipe_info.sql](https://github.com/mcompscis/recipeApp/blob/main/app/recipes/recipe_queries/return_specific_recipe_info.sql)
    - [get_reviews.sql](https://github.com/mcompscis/recipeApp/blob/main/app/recipes/recipe_queries/get_reviews.sql)

