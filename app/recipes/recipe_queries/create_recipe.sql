SET @cuisineID = (SELECT cuisine_id FROM Cuisine WHERE cuisine_name =
%(cuisine)s);

-- The following query will create a 'Palak Paneer' recipe and insert it into the Recipe table, all values below will be user input from the recipe creation table
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
             @cuisineID,
             %(description)s,
             %(recipe_text)s,
             %(calories)s,
             %(time_to_prepare)s,
             %(img_url)s
);

SELECT LAST_INSERT_ID();