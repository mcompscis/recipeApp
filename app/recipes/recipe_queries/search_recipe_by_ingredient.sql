-- This query filters the Recipe table such that only entries with specified ingredients and those without the specified allergens will be returned
-- The query below assumes that the user wants to filter the recipe list based on ingredients like 'chicken' as an example of include_ingredient_1
-- and wants to avoid the ingredient 'paneer' as an example of exclude_ingredient_1
SELECT DISTINCT recipe_name
FROM (
	SELECT ri.ingredient_id,  ri.recipe_id, i.ingredient_name, r.recipe_name
	FROM Ingredient AS i
	INNER JOIN RecipeIngredient AS ri 
              ON i.ingredient_id = ri.ingredient_id
	INNER JOIN Recipe AS r
              ON ri.recipe_id = r.recipe_id
	WHERE ri.recipe_id NOT IN (
			SELECT DISTINCT (ri.recipe_id)
			FROM Ingredient AS i
			INNER JOIN RecipeIngredient AS ri ON i.ingredient_id = ri.ingredient_id
			WHERE i.ingredient_name LIKE %(exclude_ingredient_1)s
		)
              AND ingredient_name LIKE %(include_ingredient_1)s
) T
ORDER BY recipe_name;
