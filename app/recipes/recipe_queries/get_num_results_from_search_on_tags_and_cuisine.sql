-- This query filters the list of recipes in Recipe based on cuisine and tag
-- The user passes %(tag_text)s . %(cuisine_name)s to filter the recipes
-- The Frontend decides what %(limit_val)s and %(offset_val)s to load the appropriate number of pages at a time
-- limit_val is number of recipes to display on a page and offset_val is the offset for recipes on each page
-- The queries are ordered based on weighted rating

SELECT COUNT(DISTINCT recipe_id,
       recipe_name,
       avg_rating,
       num_ratings,
       cuisine_name,
       img_url) AS CNT
FROM   (SELECT tag_text,
               r.recipe_id AS recipe_id,
               recipe_name,
               avg_rating,
               num_ratings,
               cuisine_name,
               img_url
        FROM   Tag AS t
               INNER JOIN RecipeTag AS rt
                       ON t.tag_id = rt.tag_id
               INNER JOIN (SELECT * FROM Recipe WHERE ((%(is_recipe_name_null)s IS NULL) OR (MATCH (recipe_name) AGAINST(%(recipe_name)s)))) AS r
                       ON rt.recipe_id = r.recipe_id
               INNER JOIN Cuisine AS c
                       ON r.cuisine_id = c.cuisine_id
WHERE  ((%(is_tag_query_param_null)s IS NULL) OR (tag_text IN %(tag_texts)s))
AND ((%(is_cuisine_query_param_null)s IS NULL) OR (cuisine_name IN %(cuisine_names)s))) T;