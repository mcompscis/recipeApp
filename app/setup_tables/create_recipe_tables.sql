CREATE TABLE User
(
    user_id INT NOT NULL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(65) NOT NULL,
    avg_recipe_rating DECIMAL(3, 2),
    num_recipes_created INT NOT NULL,
);

CREATE TABLE Cuisine 
(
    cuisine_id INT NOT NULL PRIMARY KEY,
    cuisine_name VARCHAR(255) NOT NULL
);

CREATE TABLE Recipe (
    recipe_id INT NOT NULL PRIMARY KEY,
    creator_id INT NOT NULL REFERENCES User(user_id),
    recipe_name VARCHAR(255) NOT NULL,
    serves INT NOT NULL,
    date_submitted DATE NOT NULL,
    cuisine_id VARCHAR(255) REFERENCES Cuisine(cuisine_id),
    description TEXT,
    calories INT,
    avg_rating DECIMAL(3, 2),
    time_to_prepare INT,
    num_ratings INT NOT NULL,
    img_url TEXT
);

CREATE TABLE Ingredient (
    ingredient_id INT NOT NULL PRIMARY KEY,
    ingredient_name TEXT NOT NULL
);

CREATE TABLE Tag (
    tag_id INT NOT NULL PRIMARY KEY,
    text TEXT NOT NULL
);

CREATE TABLE RecipeIngredients (
    recipe_id INT NOT NULL REFERENCES Recipe(recipe_id),
    ingredient_id INT NOT NULL REFERENCES Ingredient(ingredient_id),
    quantity INT NOT NULL,
    measurement_type VARCHAR(255) NOT NULL,
    PRIMARY KEY(recipe_id, ingredient_id)
);

CREATE TABLE RecipeTag (
    recipe_id INT NOT NULL REFERENCES Recipe(recipe_id),
    tag_id INT NOT NULL REFERENCES Tag(tag_id),
    PRIMARY KEY(recipe_id, tag_id)
);

CREATE TABLE Interactions (
    user_id INT NOT NULL REFERENCES User(user_id),
    recipe_id INT NOT NULL REFERENCES Recipe(recipe_id),
    interaction_date DATE NOT NULL,
    rating  DECIMAL(3, 2),
    review TEXT,
    PRIMARY KEY(user_id, recipe_id)
);



