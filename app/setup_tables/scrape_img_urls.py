import requests
from bs4 import BeautifulSoup
from concurrent import futures
import pandas as pd
import numpy as np
import pickle

recipe_df = pd.read_csv("recipe_df_178k_with_updated_users.csv")
def scrape_img(url):
    result = requests.get(url)
    soup = BeautifulSoup(result.content,"html.parser")
    try:
        url = soup.find("meta", {"name": "og:image"})["content"]
        return url
    except Exception as e:
        return ""

if __name__ == "__main__":
    MAX_PROCESSES = 30
    with futures.ProcessPoolExecutor(max_workers=MAX_PROCESSES) as executor:
        scraped_img_urls = list(executor.map(scrape_img, recipe_df["food_recipe_url"].values))

    with open("scraped_img_urls.pkl", "wb") as f:
        pickle.dump(scraped_img_urls, file=f)
