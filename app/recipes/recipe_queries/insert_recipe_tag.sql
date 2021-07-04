INSERT INTO RecipeTag
            (recipe_id,
             tag_id)
VALUES      (%(recipe_id)s,
             (SELECT tag_id
              FROM   Tag
              WHERE  tag_text = %(tag_text)s));