
SELECT * FROM
Recipe R, RecipeIngredients RI, Ingredient I
WHERE (R.recipe_id = RI.recipe_id) AND (RI.ingredient_id = I.ingredient_id)

-- Allergic recipes
CREATE VIEW allergic_recipes
AS
SELECT DISTINCT recipe_id FROM
Recipe R, RecipeIngredients RI, Ingredient I
WHERE (R.recipe_id = RI.recipe_id) AND (RI.ingredient_id = I.ingredient_id)
AND ((ingredient_name LIKE '%peanut%'
    OR ingredient_name LIKE '%coconut%'));

CREATE VIEW needed_ingredients
AS
SELECT ingredient_id FROM
ingredients I
WHERE ((ingredient_name LIKE '%sugar%')
        OR (ingredient_name LIKE '%salt%')
        OR (ingredient_name LIKE '%vanilla%')
        OR (ingredient_name LIKE '%butter%')
        OR (ingredient_name LIKE '%flour%')
    );
--CREATE VIEW searched_recipe_ids
--AS
--SELECT DISTINCT recipe_id FROM
--Recipe R, RecipeIngredients RI, Ingredients I
--WHERE (R.recipe_id NOT IN allergic_recipes)
--AND (R.recipe_id = RI.recipe_id) AND (RI.ingredient_id = I.ingredient_id)i
