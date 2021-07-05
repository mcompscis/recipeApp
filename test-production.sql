
-- Queries for Feature 1
SELECT EXISTS (SELECT * FROM Ingredient WHERE ingredient_name = "spinach") AS DoesExist;

SELECT EXISTS (SELECT * FROM Tag WHERE tag_text = "vegetarian") AS DoesExist;


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
VALUES     (1,
             "Chilli paneer",
             4,
            '2004-01-01',
             (SELECT cuisine_id FROM Cuisine WHERE cuisine_name = "indian"),
             NULL,
             "Recipe methodology here",
             800,
             30,
			"https://media.chefdehome.com/750/0/0/saag-paneer/restaurant-style-indian-saag-paneer-chefdehome-3.jpg"
);

-- Query for Feature 1
INSERT INTO RecipeIngredient
            (recipe_id,
             ingredient_id,
             quantity,
             measurement_unit)
VALUES      ((SELECT LAST_INSERT_ID()),
             (SELECT ingredient_id
              FROM   Ingredient
              WHERE  ingredient_name = 'lettuce'),
             1,
             'cup');

-- Query for Feature 2
SELECT DISTINCT recipe_id,
       recipe_name,
       avg_rating,
       num_ratings,
       cuisine_name
FROM   (SELECT tag_text,
               r.recipe_id AS recipe_id,
               recipe_name,
               avg_rating,
               num_ratings,
               cuisine_name
        FROM   Tag AS t
               INNER JOIN RecipeTag AS rt
                       ON t.tag_id = rt.tag_id
               INNER JOIN Recipe AS r
                       ON rt.recipe_id = r.recipe_id
               INNER JOIN Cuisine AS c
                       ON r.cuisine_id = c.cuisine_id
WHERE  tag_text = "vegetarian"
AND cuisine_name = "ethiopian") T
ORDER  BY ((avg_rating * num_ratings) + (SELECT AVG(avg_rating) FROM Recipe) * 100) / (num_ratings + 100) DESC
LIMIT  5
OFFSET 0;

-- Query for Feature 3
-- Using IMDB's weighted rating formula which gives a true Bayesian estimate
-- Source: https://stackoverflow.com/questions/1411199/what-is-a-better-way-to-sort-by-a-5-star-rating
-- Selecting m = 100 (meaning that a recipe needs a minimum of 100 ratings to feature in the top ratings)
SELECT *
FROM Recipe
ORDER BY ((avg_rating * num_ratings) + (SELECT AVG(avg_rating) FROM Recipe) * 100) / (num_ratings + 100) DESC
LIMIT  5
OFFSET 0;

-- Queries for Feature 4
SELECT T1.recipe_id,
       T1.recipe_name,
       T1.serves,
       T1.date_submitted,
       T1.cuisine_name,
       T1.description,
       T1.recipe_text,
       T1.calories,
       T1.avg_rating,
       T1.time_to_prepare,
       T1.num_ratings,
       T1.img_url,
       T1.ingredients,
       T1.quantities,
       T1.measurement_units,
       GROUP_CONCAT(tag_text) AS tag_text
FROM   (SELECT R.recipe_id,
               R.recipe_name,
               R.serves,
               R.date_submitted,
               C.cuisine_name,
               R.description,
               R.recipe_text,
               R.calories,
               R.avg_rating,
               R.time_to_prepare,
               R.num_ratings,
               R.img_url,
               GROUP_CONCAT(ingredient_name)  AS ingredients,
               GROUP_CONCAT(quantity)         AS quantities,
               GROUP_CONCAT(measurement_unit) AS measurement_units
        FROM   Recipe R,
               RecipeIngredient RI,
               Ingredient I,
               Cuisine C
        WHERE  ( R.recipe_id = 211173)
               AND ( R.recipe_id = RI.recipe_id )
               AND ( RI.ingredient_id = I.ingredient_id )
               AND ( R.cuisine_id = C.cuisine_id )
        GROUP  BY C.cuisine_name,
                  R.description,
                  R.recipe_text,
                  R.calories,
                  R.avg_rating,
                  R.time_to_prepare,
                  R.num_ratings,
                  R.img_url) T1,
       RecipeTag RT,
       Tag T
WHERE  ( T1.recipe_id = RT.recipe_id )
       AND ( RT.tag_id = T.tag_id )
GROUP  BY T1.recipe_id,
          T1.recipe_name,
          T1.serves,
          T1.date_submitted,
          T1.cuisine_name,
          T1.description,
          T1.recipe_text,
          T1.calories,
          T1.avg_rating,
          T1.time_to_prepare,
          T1.num_ratings,
          T1.img_url,
          T1.ingredients,
          T1.quantities,
          T1.measurement_units;

SELECT review
FROM Interaction
WHERE recipe_id = 211173
LIMIT  5
OFFSET 0;


-- Query for Feature 5
INSERT INTO Interaction
            (
                        user_id,
                        recipe_id,
                        interaction_date,
                        rating,
                        review
            )
            VALUE
            (
                        2,
                        211173,
                        '2020-01-01',
                        4,
                        "review text here"
            );
            
-- Query for Feature 6            
SELECT DISTINCT recipe_id
FROM (
	SELECT ri.ingredient_id,  ri.recipe_id, i.ingredient_name, r.recipe_name
	FROM Ingredient AS i
	INNER JOIN RecipeIngredient AS ri 
              ON i.ingredient_id = ri.ingredient_id
	INNER JOIN Recipe AS r
              ON ri.recipe_id = r.recipe_id
	WHERE ri.recipe_id NOT IN (
			SELECT DISTINCT (ri.recipe_id)
			FROM Ingredient AS i
			INNER JOIN RecipeIngredient AS ri ON i.ingredient_id = ri.ingredient_id
			WHERE i.ingredient_name LIKE "%chicken%"
		)
              AND ingredient_name LIKE "%paneer%"
) T
ORDER BY recipe_name;
