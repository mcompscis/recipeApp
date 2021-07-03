-- This query orders all recipes based on average rating and returns the top 5
SELECT *
FROM   Recipe
ORDER  BY avg_rating DESC, num_ratings DESC
LIMIT  5; 
