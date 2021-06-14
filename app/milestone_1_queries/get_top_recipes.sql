-- This query orders all recipes based on average rating and returns the top 5


SELECT * 
FROM SampleRecipe
ORDER BY avg_rating DESC LIMIT 5;
