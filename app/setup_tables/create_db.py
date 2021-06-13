from mysql.connector import connect
import json
from os import path


with open("../recipeApp/db_credentials.json", "rb") as f:
    db_creds = json.load(f)
    db_creds["database"] = db_creds["database_name"]
    del db_creds["database_name"]
    print(db_creds)

connection = connect(**db_creds)
cursor = connection.cursor()

sql_query = "CREATE DATABASE recipe"
cursor.execute(sql_query)

cursor.close()
connection.close()
