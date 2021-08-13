SELECT username, rating, review, interaction_date
FROM Interaction I, User U
WHERE (I.user_id = U.user_id) AND (recipe_id = %(recipe_id)s) AND (review IS NOT NULL)
ORDER BY interaction_date DESC
LIMIT  10
OFFSET %(offset_val)s;