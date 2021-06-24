from bs4 import BeautifulSoup
import pandas as pd
import numpy as np
import json
import requests
import pickle
from os import listdir, path
from functools import partial
import re
from concurrent import futures
import time


def add_food_recipe_url(recipe_df):
    recipe_df["food_recipe_url"] = ("https://www.food.com/recipe/"
                                    + recipe_df["name"].str.replace(" ", "-")
                                    + "-"
                                    + recipe_df["id"].astype(str)
                                   )
    return recipe_df


def scrape_recipe(food_recipe_url):
    result = requests.get(food_recipe_url)
    soup = BeautifulSoup(result.content, 'html.parser')
    quantities = []
    measurement_units = []
    for tag in soup.find_all("li", {"class": "recipe-ingredients__item"}):
        try:
            quantity = tag.find("div", {"class": "recipe-ingredients__ingredient-quantity"}).text.strip()
            quantity = re.sub(' +',' ',quantity)
            quantities.append(quantity)
            ingredient_part = tag.find("div", {"class": "recipe-ingredients__ingredient-parts"}).text.strip()
            ingredient_part = re.sub(' +',' ',ingredient_part)
            measurement_unit = (re.search("(\(.*\))* *[A-za-z\.]*", ingredient_part).group(0)
                                if (quantity!="") else "")
            measurement_units.append(measurement_unit)
        except AttributeError:
            continue

    return [quantities, measurement_units]

def scrape():
    raw_data_dir = "food_data"
    listdir(raw_data_dir)
    create_file_path = partial(path.join, "food_data")

    with open(create_file_path("ingr_map.pkl"), "rb") as f:
        ingredients_map_df= pickle.load(f)
    raw_recipe_df = pd.read_csv(create_file_path("RAW_recipes.csv"))
    pp_recipe_df = pd.read_csv(create_file_path("PP_recipes.csv"))
    raw_interaction_df = pd.read_csv(create_file_path("RAW_interactions.csv"))
    pp_user_df = pd.read_csv(create_file_path("PP_users.csv"))

    filtered_raw_recipe_df = raw_recipe_df[raw_recipe_df.id.isin(pp_recipe_df.id)]
    recipe_df = add_food_recipe_url(filtered_raw_recipe_df)

    MAX_PROCESSES = 30
    with futures.ProcessPoolExecutor(max_workers=MAX_PROCESSES) as executor:
        scraped_measurements = np.array(list(executor.map(scrape_recipe, recipe_df["food_recipe_url"].values)))

    recipe_df["quantities"] = scraped_measurements[:, 0]
    recipe_df["measurement_units"] = scraped_measurements[:, 1]

    with open("scraped_food_measurements.pkl", "wb") as f:
        pickle.dump(scraped_measurements, file=f)

    recipe_df.to_csv("raw_178k_recipes_with_scraped_measurements.csv", index=False)


if __name__ == "__main__":
    scrape()
