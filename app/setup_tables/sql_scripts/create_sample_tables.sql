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
    creator_id INT NOT NULL, 
    recipe_name VARCHAR(255) NOT NULL,
    serves INT NOT NULL,
    date_submitted DATE NOT NULL,
    cuisine_id INT,
    description TEXT,
    calories INT,
    avg_rating DECIMAL(3, 2),
    time_to_prepare INT,
    num_ratings INT NOT NULL,
    img_url TEXT,
    FOREIGN KEY (creator_id) REFERENCES SampleUser(user_id),
    FOREIGN KEY (cuisine_id) REFERENCES SampleCuisine(cuisine_id)
);

CREATE TABLE IF NOT EXISTS SampleIngredient (
    ingredient_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ingredient_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS SampleTag (
    tag_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tag_text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS SampleRecipeIngredient (
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL, 
    quantity INT NOT NULL,
    measurement_type VARCHAR(255) NOT NULL,
    PRIMARY KEY(recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES SampleRecipe(recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES SampleIngredient(ingredient_id)
);

CREATE TABLE IF NOT EXISTS SampleRecipeTag (
    recipe_id INT NOT NULL ,
    tag_id INT NOT NULL,
    PRIMARY KEY(recipe_id, tag_id),
    FOREIGN KEY (recipe_id) REFERENCES SampleRecipe(recipe_id),
    FOREIGN KEY (tag_id) REFERENCES SampleTag(tag_id)
);

CREATE TABLE IF NOT EXISTS SampleInteraction (
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    interaction_date DATE NOT NULL,
    rating DECIMAL(3, 2),
    review TEXT,
    PRIMARY KEY(user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES SampleUser(user_id),
    FOREIGN KEY (recipe_id) REFERENCES SampleRecipe(recipe_id)
);
