
INSERT INTO SampleUser(username,hashed_password,avg_recipe_rating,num_ratings_received,num_recipes_created)
VALUES
('alric','password1',NULL,0,0),
('pranav','password2',NULL,0,0),
('denis','password3',NULL,0,0),
('mayank','password4',NULL,0,0),
('TA','password5',NULL,0,0);

INSERT INTO SampleCuisine(cuisine_name)
VALUES
('Korean'),
('Lebanese'),
('Indian'),
('Japanese'),
('Jamaican');

INSERT INTO 
SampleRecipe(creator_id,recipe_name,serves,date_submitted,cuisine_id,description,recipe_text,calories,avg_rating,time_to_prepare,num_ratings,img_url)
VALUES
(1,'Korean Fried Chicken',3,'2020-12-1',1,'yum',"recipe_here",400,NULL,90,0,'https://www.kitchensanctuary.com/wp-content/uploads/2019/08/Korean-Fried-Chicken-square-FS-New-7377.jpg'),
(2,'Chilli Paneer',1,'2020-1-2',3,'alright for vegetarians',"recipe_here",7000,NULL,50,0,'https://www.mineralpro.com/assets/uploads/2015/09/bigstock-Washing-Colorful-Fruits-And-Ve-39688621.jpg'),
(3,'Jerk Chicken',2,'2019-4-12',5,'wow',"recipe_here",345,NULL,30,0,'https://lh3.googleusercontent.com/proxy/yNKaCDHa3hxRIdaYHoeuGYkqeFk0nJ1l8LEZuGWx7Sxj31MCQJNU0iiHvTBBqoXYvSkWDIkMXS_5V5Vl_jFjRNLfoKjHldh3bxnfRZAUPBOa'),
(4,'Shawarma',3,'1979-1-1',2,'epic',"recipe_here",120,NULL,49,0,'https://2leoi01pv87xeeh823nq9mgv-wpengine.netdna-ssl.com/wp-content/uploads/2021/01/Lazeez-Red-White.png'),
(5,'Sushi',4,'2020-2-28',4,'delicious',"recipe_here",150,NULL,27,0,'https://www.happyfoodstube.com/wp-content/uploads/2016/03/homemade-sushi-image.jpg'),
(4,'Shawarma2',3,'1979-1-1',2,'epic',"recipe_here",120,NULL,49,0,'https://2leoi01pv87xeeh823nq9mgv-wpengine.netdna-ssl.com/wp-content/uploads/2021/01/Lazeez-Red-White.png');

INSERT INTO SampleIngredient(ingredient_name)
VALUES
('salt'),
('chicken'),
('paneer'),
('rice'),
('fish'),
('bread'),
('garlic sauce'),
('green onions'),
('flour'),
('oil'),
('chilli powder');

INSERT INTO SampleTag(tag_text)
VALUES
('family'),
('spicy'),
('peanuts'),
('vegetarian'),
('PG-13');

INSERT INTO 
SampleRecipeIngredient(recipe_id,ingredient_id,quantity,measurement_type)
VALUES
(1,1,2,'cups'),
(1,2,2,'kg'),
(1,8,0.5,'gram'),
(1,9,3,'kg'),
(1,10,3,'tsp'),
(1,11,3,'tsp'),
(2,1,10,'cups'),
(2,3,1,'kg'),
(2,10,10,'cups'),
(2,11,12,'cups'),
(3,1,0.2,'cups'),
(3,2,1,'kg'),
(3,10,10.5,'cups'),
(3,11,1.25,'cups'),
(4,1,0.2,'cups'),
(4,2,1,'kg'),
(4,7,10.5,'cups'),
(5,4,2,'cups'),
(5,5,10,'kg');

INSERT INTO SampleRecipeTag(recipe_id,tag_id)
VALUES
(1,3),
(1,2),
(2,4),
(2,2),
(3,5),
(5,1);

INSERT INTO SampleInteraction(user_id,recipe_id,interaction_date,rating,review)
VALUES
(5,1,'2020-12-6',5,'spicy'),
(3,2,'2020-12-7',1,'recipe GONE WRONG! (COPS CALLED)'),
(1,2,'2020-12-8',1,'who would eat this'),
(4,3,'2020-12-9',5,'whoever is reading this, I hope you have a blessed day'),
(1,3,'2020-12-10',5,'omg so good'),
(2,3,'2020-12-11',5,'nice recipe bro'),
(3,4,'2020-12-12',4.3,'first'),
(1,4,'2020-12-13',4.5,'fortnight > pubg LOL'),
(3,5,'2020-12-14',5,'poggers'),
(2,5,'2020-12-15',5,'perfect'),
(1, 6, '2019-02-01', 5, "good");
