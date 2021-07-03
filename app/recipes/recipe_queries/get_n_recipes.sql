SELECT *
FROM Recipe
ORDER BY avg_rating DESC, num_ratings DESC
LIMIT  %(limit_val)s
OFFSET %(offset_val)s;