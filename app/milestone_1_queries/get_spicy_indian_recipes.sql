-- This query filters the list of recipes in SampleRecipe based on cuisine and tag 

-- It is assumed in the query below that the user wants to filter for recipes that are 'spicy' and belong to the 'Indian' cuisine


SELECT recipe_id, recipe_name, avg_rating
FROM (
	SELECT tag_text AS tag, sr.recipe_id AS recipe_id, recipe_name, avg_rating, cuisine_name
	FROM SampleTag AS st
	INNER JOIN SampleRecipeTag AS srt ON st.tag_id = srt.tag_id
	INNER JOIN SampleRecipe AS sr ON srt.recipe_id = sr.recipe_id
	INNER JOIN SampleCuisine AS sc ON sr.cuisine_id = sc.cuisine_id
) T
WHERE tag = 'spicy' AND cuisine_name = 'Indian'
ORDER BY avg_rating DESC;

