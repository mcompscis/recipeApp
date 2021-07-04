CREATE FULLTEXT INDEX RecipeNameIndex ON Recipe (recipe_name);
CREATE INDEX CalorieIndex ON Recipe (calories);
CREATE INDEX TimeToPrepareIndex ON Recipe (time_to_prepare);
CREATE INDEX NumRatingsIndex ON Recipe (num_ratings);
CREATE INDEX DateSubmittedIndex ON Recipe (date_submitted);
