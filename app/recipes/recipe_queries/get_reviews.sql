SELECT review
FROM Interaction
WHERE recipe_id = %(recipe_id)s
LIMIT  %(limit_val)s
OFFSET %(offset_val)s;