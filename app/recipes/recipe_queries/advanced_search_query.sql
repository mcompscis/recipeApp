-- This query allows advanced search with optional parameters like provided tags, cuisines, included and excluded ingredients
SELECT DISTINCT T.recipe_id, T.recipe_name, T.num_ratings, T.avg_rating, T.description, T.img_url
FROM
(SELECT tag_text, r.recipe_id AS recipe_id, recipe_name,
        avg_rating, num_ratings, cuisine_name, img_url, description
        FROM   (SELECT * FROM Tag WHERE ((%(is_tag_query_param_null)s IS NULL) OR (tag_text IN %(tag_texts)s))) AS t
               INNER JOIN RecipeTag AS rt
                ON t.tag_id = rt.tag_id
               INNER JOIN 
               (SELECT 
                RI.ingredient_id, RI.recipe_id, I.ingredient_name, R.recipe_name, 
                R.num_ratings, R.avg_rating, R.description, R.img_url, R.cuisine_id
                FROM Ingredient 
                INNER JOIN RecipeIngredient RI
                ON I.ingredient_id = RI.ingredient_id
                INNER JOIN (
                        SELECT * FROM Recipe 
                        WHERE ((%(is_recipe_name_null)s IS NULL) OR (MATCH (recipe_name) AGAINST(%(recipe_name)s)))
                ) R
                ON RI.recipe_id = R.recipe_id
                WHERE RI.recipe_id NOT IN (
                        SELECT DISTINCT (RI.recipe_id)
                        FROM Ingredient I
                        INNER JOIN RecipeIngredient RI 
                        ON I.ingredient_id = RI.ingredient_id
                        WHERE ((%(is_excluded_ingr_lst_null)s IS NOT NULL) AND 
                        (MATCH(I.ingredient_name) AGAINST(%(exclude_ingredients)s)))
                        )
                        AND ((%(is_included_ingr_lst_null)s IS NULL) OR 
                        (MATCH(ingredient_name) AGAINST(%(include_ingredients)s)))) r
                ON rt.recipe_id = r.recipe_id
                INNER JOIN (
                        SELECT * FROM Cuisine 
                        WHERE ((%(is_cuisine_query_param_null)s IS NULL) OR (cuisine_name IN %(cuisine_names)s))) AS c
                        ON r.cuisine_id = c.cuisine_id
                ) T
LIMIT  %(limit_val)s
OFFSET %(offset_val)s;



