INSERT INTO RecipeIngredient
            (recipe_id,
             ingredient_id,
             quantity,
             measurement_unit)
VALUES      (%(recipe_id)s,
             (SELECT ingredient_id
              FROM   Ingredient
              WHERE  ingredient_name = %(ingredient)s),
             %(quantity)s,
             %(measurement)s);