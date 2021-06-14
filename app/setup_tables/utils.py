import json
import os

def get_db_creds():
    path = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', 'recipeApp/db_credentials.json'))
    with open(path, "rb") as f:
        db_creds = json.load(f)
        db_creds["database"] = db_creds["database_name"]
        del db_creds["database_name"]
        return db_creds
