-- This query filters the SampleRecipe table such that only entries with specified ingredients and those without the specified allergens will be returned
-- The HAVING clause will be modified by the backend to include all filters
-- The query below assumes that the user wants to filter the recipe list based on ingredients like 'chicken' and 'chilli powder'
-- and wants to avoid the ingredient 'paneer'
SELECT R.recipe_id,
       R.recipe_name,
       GROUP_CONCAT(ingredient_name) AS "ingredients"
FROM   SampleRecipe R,
       SampleRecipeIngredient RI,
       SampleIngredient I
WHERE  ( R.recipe_id = RI.recipe_id )
       AND ( RI.ingredient_id = I.ingredient_id )
GROUP  BY R.recipe_id,
          R.recipe_name
HAVING ( ingredients LIKE "%chicken%" )
       AND ( ingredients LIKE "%chilli powder%" )
       AND ( ingredients NOT LIKE "%paneer%" ); 
