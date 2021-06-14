SELECT R.recipe_id, R.recipe_name, GROUP_CONCAT(ingredient_name) AS "ingredients" FROM
SampleRecipe R, SampleRecipeIngredient RI,
SampleIngredient I
WHERE (R.recipe_id = RI.recipe_id) AND (RI.ingredient_id = I.ingredient_id)
GROUP BY R.recipe_id, R.recipe_name
HAVING (ingredients LIKE "%chicken%") AND (ingredients LIKE "%chilli powder%") AND (ingredients NOT LIKE "%paneer%");

