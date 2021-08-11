-- This query filters the Recipe table such that only entries with specified ingredients and those without the specified allergens will be returned
SELECT DISTINCT T.recipe_id, T.recipe_name, T.num_ratings, T.avg_rating, T.description, T.img_url
FROM (
	SELECT RI.ingredient_id,  RI.recipe_id, I.ingredient_name, R.recipe_name, R.num_ratings, 
	R.avg_rating, R.description, R.img_url
	FROM Ingredient I
	INNER JOIN RecipeIngredient RI
              ON I.ingredient_id = RI.ingredient_id
	INNER JOIN Recipe R
              ON RI.recipe_id = R.recipe_id
	WHERE RI.recipe_id NOT IN (
			SELECT DISTINCT (RI.recipe_id)
			FROM Ingredient I
			INNER JOIN RecipeIngredient RI 
			ON I.ingredient_id = RI.ingredient_id
			WHERE MATCH (I.ingredient_name) AGAINST(%(exclude_ingredients)s)
		)
            AND MATCH (ingredient_name) AGAINST(%(include_ingredients)s)
) T
ORDER BY ((avg_rating * num_ratings) + (SELECT AVG(avg_rating) FROM Recipe) * 100) / (num_ratings + 100) DESC
LIMIT  %(limit_val)s
OFFSET %(offset_val)s;


