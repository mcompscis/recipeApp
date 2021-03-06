-- This query mimics the interaction queries generated by the backend that will fill the Interaction table
-- Triggers have been set up in the create_prod_tables script that will update the Recipe and User tables with the new rating and review
-- Below is a interaction where the user has rated a dish with a 5/5 and commented on the recipe
-- The values inserted represent user input
-- TODO: Replace hardcoded values with %s
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
                        2,1,
                        '2020-2-2',
                        5,
                        'Wow super tasty, i love chicken'
            );
