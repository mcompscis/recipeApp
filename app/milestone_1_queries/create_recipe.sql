INSERT INTO SampleRecipe(creator_id,recipe_name,serves,date_submitted,cuisine_id,description,recipe_text,calories,time_to_prepare,img_url)
VALUES(2,'Palak Paneer',1,'2020-01-02',3,'green paneer dish','recipe_here',350,50,'https://www.mineralpro.com/assets/uploads/2015/09/bigstock-Washing-Colorful-Fruits-And-Ve-39688621.jpg');


SET @recipeID = (SELECT LAST_INSERT_ID());



INSERT INTO SampleRecipeIngredient(recipe_id,ingredient_id, quantity, measurement_type)
VALUES 
(@recipeID, (SELECT ingredient_id FROM SampleIngredient WHERE ingredient_name = "spinach"), 2,'cups');
INSERT INTO SampleRecipeIngredient(recipe_id,ingredient_id, quantity, measurement_type)
VALUES 
(@recipeID, (SELECT ingredient_id FROM SampleIngredient WHERE ingredient_name = "paneer"), 2,'cups');