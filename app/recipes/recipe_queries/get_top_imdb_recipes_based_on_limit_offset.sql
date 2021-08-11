-- Using IMDB's weighted rating formula which gives a true Bayesian estimate
-- Source: https://stackoverflow.com/questions/1411199/what-is-a-better-way-to-sort-by-a-5-star-rating
-- Selecting m = 100 (meaning that a recipe needs a minimum of 100 ratings to feature in the top ratings)
SELECT *
FROM Recipe
ORDER BY ((avg_rating * num_ratings) + (SELECT AVG(avg_rating) FROM Recipe) * 100) / (num_ratings + 100) DESC
LIMIT  %(limit_val)s
OFFSET %(offset_val)s;