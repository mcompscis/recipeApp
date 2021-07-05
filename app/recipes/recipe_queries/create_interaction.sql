-- This query adds a new Interaction to the Interaction Table
-- Triggers have been set up to update the Recipe and User tables with the new avg_rating and num_ratings_received values.
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
                        %(user_id)s,
                        %(recipe_id)s,
                        %(interaction_date)s,
                        %(rating)s,
                        %(review)s
            );
