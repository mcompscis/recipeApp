INSERT INTO Recipe
            (creator_id,
             recipe_name,
             serves,
             date_submitted,
             cuisine_id,
             description,
             recipe_text,
             calories,
             time_to_prepare,
             img_url)
VALUES     (%(creator_id)s,
             %(recipe_name)s,
             %(serves)s,
             %(date_submitted)s,
             (SELECT cuisine_id FROM Cuisine WHERE cuisine_name = %(cuisine_name)s),
             %(description)s,
             %(recipe_text)s,
             %(calories)s,
             %(time_to_prepare)s,
             %(img_url)s
);