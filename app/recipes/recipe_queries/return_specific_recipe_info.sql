-- This query returns all data associated with a specific recipe across the Recipe table, Cuisine table, RecipeTag table
-- and RecipeIngredient table, for a specific recipe id.
-- It is assumed that '%(pk)s' refers to the recipe ID for which we want all of the data
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
       T1.creator_id,
       T1.ingredients,
       T1.quantities,
       T1.measurement_units,
       username,
       tag_text
       FROM
(SELECT T1.recipe_id,
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
       T1.creator_id,
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
               R.creator_id,
               R.num_ratings,
               R.img_url,
               GROUP_CONCAT(ingredient_name)  AS ingredients,
               GROUP_CONCAT(quantity)         AS quantities,
               GROUP_CONCAT(measurement_unit) AS measurement_units
        FROM   
        (SELECT * FROM Recipe WHERE recipe_id = (%(pk)s)) R
        LEFT JOIN
        RecipeIngredient RI
        ON (R.recipe_id = RI.recipe_id)
        LEFT JOIN
       Ingredient I
       ON (RI.ingredient_id = I.ingredient_id)
       LEFT JOIN
       Cuisine C
       ON ( R.cuisine_id = C.cuisine_id )
       GROUP  BY C.cuisine_name,
                  R.description,
                  R.recipe_text,
                  R.calories,
                  R.creator_id,
                  R.avg_rating,
                  R.time_to_prepare,
                  R.num_ratings,
                  R.img_url) T1
       LEFT JOIN
       RecipeTag RT
       ON ( T1.recipe_id = RT.recipe_id )
       LEFT JOIN
       Tag T
       ON  ( RT.tag_id = T.tag_id )
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
          T1.creator_id,
          T1.ingredients,
          T1.quantities,
          T1.measurement_units) T1
          INNER JOIN
          User U
          WHERE U.user_id = T1.creator_id;