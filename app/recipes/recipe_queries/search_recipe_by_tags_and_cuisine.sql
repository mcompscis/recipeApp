-- This query filters the list of recipes in Recipe based on cuisine and tag
-- The user passes %(tag_text)s . %(cuisine_name)s to filter the recipes
-- The Frontend decides what %(limit_val)s and %(offset_val)s to load the appropriate number of pages at a time
-- limit_val is number of recipes to display on a page and offset_val is the offset for recipes on each page
-- The queries are ordered based on weighted rating

SELECT recipe_id,
       recipe_name,
       avg_rating,
       num_ratings
FROM   (SELECT tag_text,
               r.recipe_id AS recipe_id,
               recipe_name,
               avg_rating,
               num_ratings,
               cuisine_name
        FROM   Tag AS t
               INNER JOIN RecipeTag AS rt
                       ON t.tag_id = rt.tag_id
               INNER JOIN Recipe AS r
                       ON rt.recipe_id = r.recipe_id
               INNER JOIN Cuisine AS c
                       ON r.cuisine_id = c.cuisine_id) 
WHERE  tag_text = %(tag_text)s
       AND cuisine_name = %(cuisine_name)s
ORDER  BY ((avg_rating * num_ratings) + (SELECT AVG(avg_rating) FROM Recipe) * 100) / (num_ratings + 100) DESC; 
LIMIT  %(limit_val)s
OFFSET %(offset_val)s;