SELECT COUNT(*) AS CNT
FROM Interaction I, User U
WHERE (I.user_id = U.user_id) AND (recipe_id = %(recipe_id)s) AND (review IS NOT NULL);