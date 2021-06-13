from mysql.connector import connect
import json
from os import path
from utils import get_db_creds

if __name__ == "__main__":
    db_creds = get_db_creds()
    connection = connect(**db_creds)
    cursor = connection.cursor()

    with open('sql_scripts/create_recipe_tables.sql', 'r') as sql_file:
        result_iterator = cursor.execute(sql_file.read(), multi=True)
        for result in result_iterator:
            print("Running query: ", result)
            print(f"Affected {result.rowcount} rows")

    cursor.close()
    connection.close()

