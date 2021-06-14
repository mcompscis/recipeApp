CREATE TABLE IF NOT EXISTS SampleUser (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(65) NOT NULL,
    avg_recipe_rating DECIMAL(3, 2),
    num_ratings_received INT NOT NULL DEFAULT 0,
    num_recipes_created INT NOT NULL DEFAULT 0
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
    recipe_text TEXT NOT NULL,
    calories INT,
    avg_rating DECIMAL(3, 2) DEFAULT NULL,
    time_to_prepare INT,
    num_ratings INT NOT NULL DEFAULT 0,
    img_url TEXT,
    FOREIGN KEY (creator_id) REFERENCES SampleUser(user_id) ON DELETE CASCADE,
    FOREIGN KEY (cuisine_id) REFERENCES SampleCuisine(cuisine_id) ON DELETE SET NULL
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
    FOREIGN KEY (recipe_id) REFERENCES SampleRecipe(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES SampleIngredient(ingredient_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS SampleRecipeTag (
    recipe_id INT NOT NULL ,
    tag_id INT NOT NULL,
    PRIMARY KEY(recipe_id, tag_id),
    FOREIGN KEY (recipe_id) REFERENCES SampleRecipe(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES SampleTag(tag_id) ON DELETE CASCADE 
);

CREATE TABLE IF NOT EXISTS SampleInteraction (
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    interaction_date DATE NOT NULL,
    rating DECIMAL(3, 2),
    review TEXT,
    PRIMARY KEY(user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES SampleUser(user_id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES SampleRecipe(recipe_id) ON DELETE CASCADE 
);

--Trigger to ensure num_recipes_created for each user remains consistent with actual value: increase by one after each new recipe created by that user
CREATE TRIGGER UpdateNumRecipesCreated AFTER INSERT ON SampleRecipe 
FOR EACH ROW 
	UPDATE SampleUser U SET num_recipes_created = num_recipes_created + 1 WHERE (U.user_id = NEW.creator_id);

--Updates average rating & number of ratings for Recipe, and number of ratings & average rating for User after a new User interaction (rating) is created for a Recipe
CREATE TRIGGER UpdateRecipeInfo AFTER INSERT ON SampleInteraction FOR EACH ROW BEGIN DECLARE recipe_creator_id integer; SET recipe_creator_id = (SELECT creator_id FROM SampleRecipe R WHERE R.recipe_id = NEW.recipe_id); UPDATE SampleRecipe R SET avg_rating = CASE WHEN avg_rating IS NULL THEN NEW.rating ELSE (((avg_rating * num_ratings) + NEW.rating) / (num_ratings + 1)) END WHERE (R.recipe_id =  NEW.recipe_id); UPDATE SampleRecipe R SET num_ratings = num_ratings + 1 WHERE R.recipe_id =  NEW.recipe_id; UPDATE SampleUser U SET num_ratings_received = num_ratings_received + 1 WHERE user_id = recipe_creator_id; UPDATE SampleUser U SET avg_recipe_rating = CASE WHEN avg_recipe_rating IS NULL THEN NEW.rating ELSE ((avg_recipe_rating * (num_ratings_received - 1)) + NEW.rating) / (num_ratings_received) END WHERE U.user_id = recipe_creator_id; END;
--One line because MySql Connector does not allow delimiters