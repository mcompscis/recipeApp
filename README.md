# cs348

Recipefy Web App

The app directory in this code repository contains all the main frontend and backend code.
The frontend was created in React and the frontend code sits in app/frontend directory.
The backend framework is Django. The Django project code sits in the app directory.
The recipeApp inside the app directory refers to the main Django project for this repository. The main Django project contains
an app. The recipes directory corresponds to a Django app part of the recipeApp project. This is where the main backend code
lies in.

To build the React app, run the following command inside the root directory

```bash
npm install
npm run dev
```

To run the Django application, run the following command inside the app directory:

```bash
python manage.py runserver
```

After starting the Django application, 2 API endpoints exist as of now:
GET localhost:8000/api/recipes/
GET localhost:8000/api/recipes/:pk

These will return JSON of all recipes in the database or specific detail about a recipe with a certain primary key.

Alternatively, navigate to localhost:8000 to view a list of all recipes displayed through a react frontend.
This is the only frontend feature fully implemented as of now.

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
