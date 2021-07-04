SELECT * FROM Recipe WHERE MATCH (recipe_name) AGAINST(%(recipe_name)s)
LIMIT %(limit_val)s OFFSET %(offset_val)s;