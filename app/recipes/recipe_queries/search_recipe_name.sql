SELECT * FROM Recipe WHERE MATCH (recipe_name) AGAINST(%(recipe_name)s)
ORDER BY ((avg_rating * num_ratings) + (SELECT AVG(avg_rating) FROM Recipe) * 100) / (num_ratings + 100) DESC
LIMIT %(limit_val)s OFFSET %(offset_val)s;