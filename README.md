# cs348

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

We used all these dataset files and used Python Jupyter Notebooks to extract, clean and transform many of these files into new CSVs.

Some problems faced: 
1. There were no usernames for the users in the data downloaded from Kaggle.
2. There was no quantity, measurements and image urls for any of the recipes from the Dataset link.

Solutions for those problems:
1. We randomly created unique usernames for the users using the Python library names. The creation of the new user table through this random generation was done through this notebook [here](https://github.com/mcompscis/recipeApp/blob/main/app/setup_tables/create_user_tables_and_experiment_migration.ipynb).
2. We developed scraping the Python scripts [scrape_img_urls.py](https://github.com/mcompscis/recipeApp/blob/main/app/setup_tables/scrape_img_urls.py) and [scrape_recipe_measurements.py](https://github.com/mcompscis/recipeApp/blob/main/app/setup_tables/scrape_recipe_measurements.py) to scrape the columns data that we needed.


### How to Load Data into Database

The Python Jupyter Notebook used to load the data into the Database was [migrate_tables.ipynb](https://github.com/mcompscis/recipeApp/blob/main/app/setup_tables/migrate_tables.ipynb). We have also created a Python script called [populate_prod_tables.py](https://github.com/mcompscis/recipeApp/blob/main/app/setup_tables/populate_prod_tables.py) for it, but we have yet to fully test it.

