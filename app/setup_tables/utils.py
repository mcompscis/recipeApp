import json

def get_db_creds():
    with open("../recipeApp/db_credentials.json", "rb") as f:
        db_creds = json.load(f)
        db_creds["database"] = db_creds["database_name"]
        del db_creds["database_name"]
        return db_creds
