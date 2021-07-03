-- This query returns all data associated with a specific recipe across the Recipe table, Cuisine table, RecipeTag table
-- and RecipeIngredient table, for a specific recipe id.
-- It is assumed that '%s' refers to the recipe ID for which we want all of the data
-- GROUP_CONCAT() is used to gather all ingredients/tags into comma separated strings
SELECT T1.recipe_id,
       T1.recipe_name,
       T1.serves,
       T1.date_submitted,
       T1.cuisine_name,
       T1.description,
       T1.recipe_text,
       T1.calories,
       T1.avg_rating,
       T1.time_to_prepare,
       T1.num_ratings,
       T1.img_url,
       T1.ingredients,
       T1.quantities,
       T1.measurement_units,
       GROUP_CONCAT(tag_text) AS tag_text
FROM   (SELECT R.recipe_id,
               R.recipe_name,
               R.serves,
               R.date_submitted,
               C.cuisine_name,
               R.description,
               R.recipe_text,
               R.calories,
               R.avg_rating,
               R.time_to_prepare,
               R.num_ratings,
               R.img_url,
               GROUP_CONCAT(ingredient_name)  AS ingredients,
               GROUP_CONCAT(quantity)         AS quantities,
               GROUP_CONCAT(measurement_unit) AS measurement_units
        FROM   Recipe R,
               RecipeIngredient RI,
               Ingredient I,
               Cuisine C
        WHERE  ( R.recipe_id = (%(pk)s) )
               AND ( R.recipe_id = RI.recipe_id )
               AND ( RI.ingredient_id = I.ingredient_id )
               AND ( R.cuisine_id = C.cuisine_id )
        GROUP  BY C.cuisine_name,
                  R.description,
                  R.recipe_text,
                  R.calories,
                  R.avg_rating,
                  R.time_to_prepare,
                  R.num_ratings,
                  R.img_url) T1,
       RecipeTag RT,
       Tag T
WHERE  ( T1.recipe_id = RT.recipe_id )
       AND ( RT.tag_id = T.tag_id )
GROUP  BY T1.recipe_id,
          T1.recipe_name,
          T1.serves,
          T1.date_submitted,
          T1.cuisine_name,
          T1.description,
          T1.recipe_text,
          T1.calories,
          T1.avg_rating,
          T1.time_to_prepare,
          T1.num_ratings,
          T1.img_url,
          T1.ingredients,
          T1.quantities,
          T1.measurement_units;
