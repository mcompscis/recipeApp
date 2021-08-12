SELECT username, rating, review, interaction_date
FROM Interaction I, User U
WHERE (I.user_id = U.user_id) AND (recipe_id = %(recipe_id)s)
LIMIT  %(limit_val)s
OFFSET %(offset_val)s;