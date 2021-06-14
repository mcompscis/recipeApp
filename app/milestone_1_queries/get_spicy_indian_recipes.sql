SELECT T.recipe_id, T.recipe_name
FROM (
	SELECT st.tag_text AS tag, sr.recipe_id AS recipe_id, sr.recipe_name AS recipe_name, sr.avg_rating AS avg_rating, sc.cuisine_name AS cuisine_name
	FROM SampleTag AS st
	JOIN SampleRecipeTag AS srt ON st.tag_id = srt.tag_id
	JOIN SampleRecipe AS sr ON srt.recipe_id = sr.recipe_id
	JOIN SampleCuisine AS sc ON sr.cuisine_id = sc.cuisine_id
) AS T
WHERE T.tag = 'spicy' AND T.cuisine_name = 'Indian'
ORDER BY T.avg_rating DESC
