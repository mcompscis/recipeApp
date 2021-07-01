CREATE TABLE IF NOT EXISTS User (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(65) NOT NULL,
    avg_recipe_rating FLOAT,
    num_ratings_received INT NOT NULL DEFAULT 0,
    num_recipes_created INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS Cuisine (
    cuisine_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cuisine_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Recipe (
    recipe_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    creator_id INT NOT NULL, 
    recipe_name VARCHAR(255) NOT NULL,
    serves INT NOT NULL,
    date_submitted DATE NOT NULL,
    cuisine_id INT,
    description TEXT,
    recipe_text TEXT NOT NULL,
    calories INT,
    avg_rating FLOAT DEFAULT NULL,
    time_to_prepare INT,
    num_ratings INT NOT NULL DEFAULT 0,
    img_url TEXT,
    FOREIGN KEY (creator_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (cuisine_id) REFERENCES Cuisine(cuisine_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Ingredient (
    ingredient_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ingredient_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Tag (
    tag_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tag_text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS RecipeIngredient (
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL, 
    quantity FLOAT DEFAULT NULL,
    measurement_unit VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY(recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES Ingredient(ingredient_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS RecipeTag (
    recipe_id INT NOT NULL ,
    tag_id INT NOT NULL,
    PRIMARY KEY(recipe_id, tag_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tag(tag_id) ON DELETE CASCADE 
);

CREATE TABLE IF NOT EXISTS Interaction (
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    interaction_date DATE NOT NULL,
    rating FLOAT,
    review TEXT,
    PRIMARY KEY(user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE 
);

CREATE TRIGGER UpdateNumRecipesCreated_prod AFTER INSERT ON Recipe 
FOR EACH ROW 
	UPDATE User U SET num_recipes_created = num_recipes_created + 1 WHERE (U.user_id = NEW.creator_id);

CREATE TRIGGER UpdateRecipeInfo_prod AFTER INSERT ON Interaction FOR EACH ROW BEGIN DECLARE recipe_creator_id integer; SET recipe_creator_id = (SELECT creator_id FROM Recipe R WHERE R.recipe_id = NEW.recipe_id); UPDATE Recipe R SET avg_rating = CASE WHEN avg_rating IS NULL THEN NEW.rating ELSE (((avg_rating * num_ratings) + NEW.rating) / (num_ratings + 1)) END WHERE (R.recipe_id =  NEW.recipe_id); UPDATE Recipe R SET num_ratings = num_ratings + 1 WHERE R.recipe_id =  NEW.recipe_id; UPDATE User U SET num_ratings_received = num_ratings_received + 1 WHERE user_id = recipe_creator_id; UPDATE User U SET avg_recipe_rating = CASE WHEN avg_recipe_rating IS NULL THEN NEW.rating ELSE ((avg_recipe_rating * (num_ratings_received - 1)) + NEW.rating) / (num_ratings_received) END WHERE U.user_id = recipe_creator_id; END;
