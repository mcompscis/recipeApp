import pandas as pd
import numpy as np
from mysql.connector import connect
import json
from os import path
from .utils import get_db_creds
import sqlalchemy
from collections import OrderedDict


def populate_user_table(conn):
    users_df = pd.read_csv("users.csv")
    users_df = users_df.rename(columns={"hashed_password": "password"})
    users_df["username"] = users_df["username"].str.replace(" ", "_")
    username_set = set()
    for i in range(len(users_df)):
        counter = 1
        while (users_df.iloc[i]["username"] in username_set):
            users_df.loc[users_df.index == i, "username"] = users_df.iloc[i]["username"] + "_" + str(counter)
            counter += 1
        username_set.add(users_df.iloc[i]["username"])
    users_df.to_sql(name="User", con=conn, if_exists="append", index=False,)

def populate_cuisine_table(conn):
    cuisines_df = pd.read_csv("cuisines.csv")
    cuisines_df.to_sql(name="Cuisine", con=conn, if_exists="append", index=False,)

def populate_tag_table(conn):
    tags_df = pd.read_csv("tags.csv")
    # There is one NA entry that we replace with ""
    tags_df = tags_df.fillna("")
    tags_df.to_sql(name="Tag", con=conn, if_exists="append", index=False,)

def populate_ingredient_table(conn):
    ingr_map_df = pd.read_csv("ingr_map.csv")
    ingr_map_df.to_sql(name="Ingredient", con=conn, if_exists="append", index=False,)
    return ingr_map_df
    
def populate_recipe_table(conn):
    recipe_df = pd.read_csv("recipe_155k_with_all_updated_columns.csv")
    columns_needed = ["recipe_id", "creator_id", "recipe_name", "serves",
                    "date_submitted", "cuisine_id", "description",
                    "recipe_text", "calories", "time_to_prepare",
                    "img_url"]
    recipe_df = recipe_df[columns_needed]
    recipe_df.to_sql(name="Recipe", con=conn, if_exists="append", index=False,)
    

def populate_recipe_ingredient_table(conn):
    recipe_ingredients_df = pd.read_csv("recipe_ingredients_df.csv")
    recipe_ingredients_df.to_sql(name="RecipeIngredient", con=conn, if_exists="append", index=False,)

def populate_interaction_table(conn):
    interactions_df = pd.read_csv("interactions_df.csv")
    interactions_df = interactions_df.drop_duplicates(subset=["user_id", "recipe_id"])
    interactions_df.to_sql(name="Interaction", con=conn, if_exists="append", index=False,)

def populate_recipe_tag_table(conn):
    recipe_tags_df = pd.read_csv("recipe_tags.csv")
    recipe_tags_df.to_sql(name="RecipeTag", con=conn, if_exists="append", index=False,)

if __name__ == "__main__":
    db_creds = get_db_creds()
    connection = connect(**db_creds)

    conn = sqlalchemy.create_engine('mysql+mysqlconnector://{0}:{1}@{2}/{3}'
                .format(db_creds["user"], db_creds["password"], db_creds["host"], db_creds["database"])).connect()
    
    populate_table_fn_map = OrderedDict(User=populate_user_table, 
                                     Cuisine=populate_cuisine_table, 
                                     Tag=populate_tag_table,
                                     Ingredient=populate_ingredient_table, 
                                     Recipe=populate_recipe_table, 
                                     Recipe_Ingredient=populate_recipe_ingredient_table,
                                     Interaction=populate_interaction_table, 
                                     Recipe_Tag=populate_recipe_tag_table)
    
    for table_name in populate_table_fn_map:
        populate_table_fn_map[table_name](conn)
        print(f"Populated {table_name} Table")
