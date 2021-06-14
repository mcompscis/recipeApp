# cs348
Recipe Web App

The project's name: RecipeApp

The Django app's name: recipe_app

The app is a module of the project, and this is where the application logic sits.

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
