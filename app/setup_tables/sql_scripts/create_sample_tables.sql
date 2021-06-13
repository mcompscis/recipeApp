CREATE TABLE IF NOT EXISTS SampleUser (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(65) NOT NULL,
    avg_recipe_rating DECIMAL(3, 2),
    num_recipes_created INT NOT NULL
);

CREATE TABLE IF NOT EXISTS SampleCuisine (
    cuisine_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cuisine_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS SampleRecipe (
    recipe_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    creator_id INT NOT NULL REFERENCES SampleUser(user_id),
    recipe_name VARCHAR(255) NOT NULL,
    serves INT NOT NULL,
    date_submitted DATE NOT NULL,
    cuisine_id VARCHAR(255) REFERENCES SampleCuisine(cuisine_id),
    description TEXT,
    calories INT,
    avg_rating DECIMAL(3, 2),
    time_to_prepare INT,
    num_ratings INT NOT NULL,
    img_url TEXT
);

CREATE TABLE IF NOT EXISTS SampleIngredient (
    ingredient_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ingredient_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS SampleTag (
    tag_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tag_text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS SampleRecipeIngredients (
    recipe_id INT NOT NULL REFERENCES SampleRecipe(recipe_id),
    ingredient_id INT NOT NULL REFERENCES SampleIngredient(ingredient_id),
    quantity INT NOT NULL,
    measurement_type VARCHAR(255) NOT NULL,
    PRIMARY KEY(recipe_id, ingredient_id)
);

CREATE TABLE IF NOT EXISTS SampleRecipeTag (
    recipe_id INT NOT NULL REFERENCES SampleRecipe(recipe_id),
    tag_id INT NOT NULL REFERENCES SampleTag(tag_id),
    PRIMARY KEY(recipe_id, tag_id)
);

CREATE TABLE IF NOT EXISTS SampleInteractions(
    user_id INT NOT NULL REFERENCES SampleUser(user_id),
    recipe_id INT NOT NULL REFERENCES SampleRecipe(recipe_id),
    interaction_date DATE NOT NULL,
    rating DECIMAL(3, 2),
    review TEXT,
    PRIMARY KEY(user_id, recipe_id)
);
