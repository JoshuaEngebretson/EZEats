-- Database should be titled EZEats

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

---------------------------------------------------------------------------------------------------------------------
	-- Build "user" table with starter data --
---------------------------------------------------------------------------------------------------------------------
CREATE TABLE "user" (
	id SERIAL PRIMARY KEY NOT NULL,
	username VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL,
	date_user_created DATE NOT NULL DEFAULT CURRENT_DATE,
	see_default_recipes BOOLEAN DEFAULT TRUE
);

-- Starter data for "user"
INSERT INTO "user"
	(username, password)
VALUES
	('defaultRecipes', '$2a$10$mvHgC4madG9DTnjLL1knS.3eGwr5ygKraosNCj//F/6MYml4aPcye'), -- password is test1
	('test2', '$2a$10$Augs.V/Uv6N9Kdse.bhUveUL7.CSKK.3Zob0pGTwdvc66sepLI682'); -- password is test2
	

---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
	-- Build food_categories table with starter data --
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------

CREATE TABLE food_categories (
	id SERIAL PRIMARY KEY NOT NULL,
	food_category_name VARCHAR NOT NULL
);

-- Starter food_categories
INSERT INTO food_categories (food_category_name)
VALUES
	('oil'), ('produce'), ('alcohol'), ('spices'), ('sauces'), ('canned goods'), ('liquids'), ('dry goods');


---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
	-- Build category table with starter data --
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------

CREATE TABLE category (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR NOT NULL
);

-- Starter categories
INSERT INTO category (name)
	VALUES ('Entree'), ('Drink'), ('Dessert'), ('Side'), ('Appetizer');


---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
	-- Build units_of_measurement table with starter data --
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------

CREATE TABLE units_of_measurement (
	id SERIAL PRIMARY KEY NOT NULL,
	unit VARCHAR NOT NULL,
	conversion_category VARCHAR NOT NULL
);
	
-- Starter units - Volume
INSERT INTO units_of_measurement (unit, conversion_category)
VALUES
	('tsp', 'volume'), ('tbsp', 'volume'), ('cubic inch', 'volume'), ('fl oz', 'volume'),
	('c', 'volume'), ('pt', 'volume'), ('qt', 'volume'), ('gal', 'volume'),
	('cubic foot', 'volume'), ('l', 'volume'), ('ml', 'volume'), ('Imperial gallon', 'volume'),
	('Imperial quart', 'volume'), ('Imperial pint', 'volume'), ('Imperial cup', 'volume'),
	('Imperial fluid ounce', 'volume'), ('Imperial tablespoon', 'volume'), ('Imperial teaspoon', 'volume');
	
-- Starter units - Mass
INSERT INTO units_of_measurement (unit, conversion_category)
VALUES
	('stone', 'mass'), ('kg', 'mass'), ('lb', 'mass'), ('oz', 'mass'), ('g', 'mass'), ('mg', 'mass');
	
-- Starter units - Other	
INSERT INTO units_of_measurement (unit, conversion_category)
VALUES
	('clove', 'other'), ('sprig', 'other'), ('whole', 'other'), ('small', 'other'), ('medium', 'other'),
	('large', 'other'), ('14 oz can', 'other'), ('28 oz can', 'other');
	
	
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
	-- Build ingredients table with starter data --
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------

CREATE TABLE ingredients (
	id SERIAL PRIMARY KEY NOT NULL,
	ingredient_name VARCHAR NOT NULL,
	food_category_id INTEGER REFERENCES food_categories(id) ON DELETE CASCADE NOT NULL 
);

-- Starter ingredients
INSERT INTO ingredients (ingredient_name, food_category_id)
VALUES
	('olive oil', 1), ('onion', 2), ('garlic', 2), ('mushrooms', 2), ('whiskey', 3), ('carrots', 2), ('celery', 2), ('thyme', 4),
	('garlic powder', 4),('coconut aminos', 5), ('tomato paste', 6), ('water', 7), ('cornstarch', 8), ('spinach', 2),
	('klondike potatoes', 2), ('salt', 4), ('pepper', 4), ('eggplant', 2), ('red pepper flakes', 4), ('yellow bell pepper', 2),
	('zucchini', 2), ('diced tomatoes', 6), ('basil', 4), ('coconut milk', 7);


---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
	-- Build recipes table with starter data --
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------

CREATE TABLE recipes (
	id SERIAL PRIMARY KEY NOT NULL,
	recipe_name VARCHAR NOT NULL,
	image_of_recipe VARCHAR,
	recipe_text TEXT NOT NULL,
	on_menu INTEGER NOT NULL DEFAULT 0,
	times_cooked INTEGER NOT NULL DEFAULT 0,
	date_recipe_added DATE NOT NULL DEFAULT CURRENT_DATE,
	user_id INTEGER REFERENCES "user" (id) ON DELETE CASCADE NOT NULL ,
	category_id INTEGER REFERENCES category (id) ON DELETE CASCADE NOT NULL 
);
	
-- Starter data for recipes table (actual recipes)
INSERT INTO recipes (recipe_name, recipe_text, image_of_recipe, user_id, category_id)
VALUES
	-- Instant Pot Mushroom Bourguignon
	('Instant Pot Mushroom Bourguignon', 'Heat the Instant Pot on Saute. Add oil. When the oil is hot, add the onion, garlic, mushrooms and a good pinch of salt and give them a quick mix. Cook for 3 to 4 minutes until golden on some edges.
Add the whiskey and mix well for a few seconds to cook out the alcohol.
Add the carrots, celery, thyme, and garlic powder and mix well. Add the coconut aminos, tomato paste, 1/3 tsp salt and water and give it a mix. Cancel saute. You can also add in 1 bay leaf and some rosemary for flavor variation at this point.
Close the Instant Pot lid. Pressure Cook for 9 to 10 minutes (Manual high pressure).
Let the pressure release naturally once the cooking is complete. Open the lid and carefully remove the steamer basket.
Put the pot on saute, Add cornstarch slurry and give it a mix. Add spinach and black pepper and mix. Bring the mixture to a boil to thicken, then cancel saute. Taste and adjust salt and flavor.
Meanwhile, make the mashed potatoes. Boil potatoes until soft, then add garlic powder, salt, pepper, olive oil, coconut milk  and optionally fresh/dried herbs of choice(eg. thyme, rosemary, chives) and mash well. 
Serve the mashed potatoes with the mushroom bourguignon. Garnish with some fresh thyme or basil and pepper.', 'https://www.veganricha.com/wp-content/uploads/2018/10/Vegan-Bourguignon-with-mushrooms-over-Cauliflower-mash-veganricha-9059.jpg', 1, 1),
	-- Ratatouille
	('Ratatouille', 'In a large pot over medium-high heat, brown the eggplant and onion in ¼ cup (60 ml) of the oil. Season with salt and pepper. Add the garlic and cook for 1 minute. Set aside in a bowl.
In the same pot, brown the mushrooms with the pepper flakes in the remaining oil. Set aside with the eggplant.
In the same pot, brown the bell peppers and zucchini. Add oil, if needed. Return the eggplant mixture to the pot. Add the tomatoes and thyme. Stir well. Bring to a boil (add a small amount of water or stock if it looks like it’s just gonna burn) and simmer gently for 15 to 20 minutes. Remove the thyme and add the basil. Adjust the seasoning. Serve with pasta, rice, or just by itself.', 'https://images.immediate.co.uk/production/volatile/sites/30/2019/05/Ratatouille-ea27a5c.jpg?quality=90&webp=true&resize=300,272', 1, 1);

-- Starter data for recipes (dummy data)
INSERT INTO recipes
    (recipe_name, recipe_text, image_of_recipe, user_id, category_id)
VALUES
    -- Test Entrees - test1
	('test Entree recipe 3', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://img.taste.com.au/TectJLK4/taste/2016/11/rockmelon-bruschetta-with-goats-cheese-and-prosciutto-70235-1.jpeg', 1, 1),
	('test Entree recipe 4', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://img.delicious.com.au/qx6JWa73/w759-h506-cfill/del/2015/10/prawns-on-toast-toast-skagen-14996-1.jpg', 1, 1),
	('test Entree recipe 5', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://www.gffoodservice.com.au/content/uploads/2019/10/entree-hero-1-@2x.jpg', 1, 1),
	('test Entree recipe 6', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://simplot-media.azureedge.net/-/media/feature/simplotfoods/globals/header/backgrounds/heromarquee-large-entreerecipe-collections.jpg?rev=ec8f5ed5ab3543a48261bc5bb3810ba4&hash=B19E6C2F006194E74B8867C408CDA40F', 1, 1),
	-- Test Drinks - test1
    ('test Drink recipe 1', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://www.acouplecooks.com/wp-content/uploads/2021/06/Strawberry-Water-006.jpg', 1, 2),
	('test Drink recipe 2', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://thebigmansworld.com/wp-content/uploads/2021/07/keto-drink-mix4.jpeg', 1, 2),
	('test Drink recipe 3', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://hips.hearstapps.com/hmg-prod/images/drink-to-order-at-the-bar-1642641671.png?crop=1.00xw:0.742xh;0,0.211xh&resize=1200:*', 1, 2),
	('test Drink recipe 4', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://target.scene7.com/is/image/Target/GUEST_e8495311-2680-48ca-aea6-6f8734db2400?wid=488&hei=488&fmt=pjpeg', 1, 2),
	('test Drink recipe 5', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://images.absolutdrinks.com/drink-images/Raw/Absolut/43d47dd3-6ac5-41f4-a9b5-c9711ecc9eb6.jpg?impolicy=drinkcrop', 1, 2),
	('test Drink recipe 6', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2016_48/1811466/161128-drinking-alcohol-jpo-108p.jpg', 1, 2),
	-- Test Desserts - test1
    ('test Dessert recipe 1', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://insanelygoodrecipes.com/wp-content/uploads/2020/07/Sweet-Colorful-Macarons.jpg', 1, 3),
	('test Dessert recipe 2', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://myfoodbook.com.au/sites/default/files/collections_image/custard_trifle_summer_dessert.jpeg', 1, 3),
	('test Dessert recipe 3', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://storcpdkenticomedia.blob.core.windows.net/media/lolretail/media/lolr-media/recipe-collections/2023/january/retail_collection_summertime-dessert-recipes_smore-ice-cream-sandwiches_760x580.jpg?ext=.jpg', 1, 3),
	('test Dessert recipe 4', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://images.immediate.co.uk/production/volatile/sites/2/2018/09/OLI-0918_HereNow-CremeCaramel_28005-cb31e47.jpg?quality=90&resize=556,505', 1, 3),
	('test Dessert recipe 5', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://insanelygoodrecipes.com/wp-content/uploads/2021/01/White-Chocolate-Oreo-Cookie-Balls.png', 1, 3),
	('test Dessert recipe 6', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://www.hersheyland.com/content/dam/hersheyland/en-us/recipes/recipe-images/366-chocolate-dessert-waffles.jpg', 1, 3),
	-- Test Sides - test1
    ('test Side recipe 1', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://www.acouplecooks.com/wp-content/uploads/2019/09/Sweet-Potato-Wedges-004.jpg', 1, 4),
	('test Side recipe 2', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://www.aheadofthyme.com/wp-content/uploads/2021/10/40-vegetable-side-dishes.jpg', 1, 4),
	('test Side recipe 3', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://drivemehungry.com/wp-content/uploads/2019/04/korean-potato-side-dish-gamja-jorim-13.jpg', 1, 4),
	('test Side recipe 4', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://theshortordercook.com/wp-content/uploads/2022/06/20-Best-Kid-Friendly-Side-Dishes-Recipes-featured.png', 1, 4),
	('test Side recipe 5', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://blog.myfitnesspal.com/wp-content/uploads/2016/12/Mini-Stuffed-Peppers-Recipe-7.jpg', 1, 4),
	('test Side recipe 6', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://images.immediate.co.uk/production/volatile/sites/30/2021/03/Hasselback-Potatoes-a818dcb.jpg?quality=90&resize=960,872', 1, 4),
	-- Test Appetizer - test1
    ('test Appetizer recipe 1', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://cdn.loveandlemons.com/wp-content/uploads/2019/12/easy-appetizers-1.jpg', 1, 5),
	('test Appetizer recipe 2', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://www.homemadefoodjunkie.com/wp-content/uploads/2016/05/Caprese-Salad-Bites-party-tray-720x405.jpg', 1, 5),
	('test Appetizer recipe 3', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://www.thespruceeats.com/thmb/U0hbsO63biJQ2JiDZdexbbmxsNE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/easy-appetizer-meatballs-3054462-Final-5babc194c9e77c0025161739.jpg', 1, 5),
	('test Appetizer recipe 4', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://www.eatwell101.com/wp-content/uploads/2017/10/Shrimp-shooters-Recipe.jpg', 1, 5),
	('test Appetizer recipe 5', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://images.eatsmarter.com/sites/default/files/styles/576x432/public/egg-salad-appetizers-613108.jpg', 1, 5),
	('test Appetizer recipe 6', 'Example recipe text here\nThis should be a 2nd line\nThis should be a 3rd line\nThis should be a 4th line', 'https://www.allrecipes.com/thmb/HypncxBKRjdHQShfJlCChJv3yBA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4303385-646d757e8a674a8caac7708533b1611d.jpg', 1, 5);


---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
	-- Build recipe_ingredients table with starter data --
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------

CREATE TABLE recipe_ingredients (
	id SERIAL PRIMARY KEY NOT NULL,
	quantity DECIMAL NOT NULL,
	converted_quantity DECIMAL,
	converted_unit VARCHAR DEFAULT NULL,
	unit_id INTEGER REFERENCES units_of_measurement (id) ON DELETE CASCADE NOT NULL,
	ingredients_id INTEGER REFERENCES ingredients (id) ON DELETE CASCADE NOT NULL,
	method VARCHAR DEFAULT NULL,
	recipe_id INTEGER REFERENCES recipes (id) ON DELETE CASCADE NOT NULL,
	for_which_part VARCHAR DEFAULT NULL
);

-- Starter data for recipe_ingredients (real recipes)
INSERT INTO recipe_ingredients
	(quantity, converted_quantity, converted_unit, unit_id, ingredients_id, method, recipe_id, for_which_part)
VALUES
	-- Mushroom Bourguinon
	(2, 2, 'tsp', 1, 1, NULL, 1, NULL), (0.5, NULL, NULL,  29, 2, 'chopped', 1, NULL), (4, NULL, NULL, 25, 3, 'chopped, finely', 1, NULL),
	(10, 283.5, 'g', 22, 4, 'sliced', 1, NULL), (0.25, 12.173, 'tsp', 5, 5, NULL, 1, NULL), (0.75, 36.519, 'tsp', 5, 6, 'chopped', 1, NULL),
	(1, 48.692, 'tsp', 5, 7, 'chopped', 1, NULL), (0.75, 0.75, 'tsp', 1, 8, 'dried', 1, NULL), (0.25, 0.25, 'tsp', 1, 9, NULL, 1, NULL),
	(1, 3, 'tsp', 2, 10, NULL, 1, NULL), (2, 2, 'tsp', 1, 11, NULL, 1, NULL), (0.5, 24.346, 'tsp', 5, 12, NULL, 1, NULL),
	(1, 3, 'tsp', 2, 13, 'mixed in 3 tbsp water', 1, NULL), (1, 48.692, 'tsp', 5, 14, NULL, 1, NULL),
	-- Potatoes for Bourguinon
	(6, NULL, NULL, 30, 15, NULL, 1, 'mash potatoes'), (1, 3, 'tsp', 2, 1, NULL, 1, 'mash potatoes'),
	(3, 9, 'tsp', 2, 24, NULL, 1, 'mash potatoes'), (0.25, 0.25, 'tsp', 1, 16, NULL, 1, 'mash potatoes'),
	(0.25, 0.25, 'tsp', 1, 9, NULL, 1, 'mash potatoes'),
	-- Ratatouille
	(1, NULL, NULL, 27, 18, 'cubed', 2, NULL), (1, NULL, NULL, 30, 2, 'chopped', 2, NULL), (6, 18, 'tsp', 2, 1, NULL, 2, NULL),
	(6, NULL, NULL, 25, 3, 'chopped, finely', 2, NULL), (0.5, 226.8, 'g', 21, 4, 'quartered', 2, NULL),
	(0.25, 0.25, 'tsp', 1, 19, NULL, 2, NULL), (2, NULL, NULL, 27, 20, 'diced', 2, NULL), (2, NULL, NULL, 27, 21, 'cubed', 2, NULL),
	(1, NULL, NULL, 32, 22, 'drained', 2, NULL), (4, NULL, NULL, 26, 8, NULL, 2, NULL), (0.25, 12.173, 'tsp', 5, 23, 'chopped', 2, NULL);

-- Starter data for recipe_ingredients (dummy data)
INSERT INTO recipe_ingredients
	(quantity, converted_quantity, converted_unit, unit_id, ingredients_id, method, recipe_id, for_which_part)
VALUES
	-- test1 recipes
	(2, 2, 'tsp', 1, 1, NULL, 3, NULL), (0.5, NULL, NULL, 29, 2, 'chopped', 4, NULL), (4, NULL, NULL, 25, 3, 'chopped, finely', 5, NULL),
	(10, 283.5, 'g', 22, 4, 'sliced', 6, NULL), (0.25, 12.173, 'tsp', 5, 5, NULL, 7, NULL), (0.75, 36.519, 'tsp', 5, 6, 'chopped', 8, NULL),
	(1, 48.692, 'tsp', 5, 7, 'chopped', 9, NULL), (0.75, 0.75, 'tsp', 1, 8, 'dried', 10, NULL), (0.25, 0.25, 'tsp', 1, 9, NULL, 11, NULL),
	(1, 3, 'tsp', 2, 10, NULL, 12, NULL), (2, 2, 'tsp', 1, 11, NULL, 13, NULL), (0.5, 24.346, 'tsp', 5, 12, NULL, 14, NULL),
	(1, 3, 'tsp', 2, 13, 'mixed in 3 tbsp water', 15, NULL), (1, 48.692, 'tsp', 5, 14, NULL, 16, NULL),
	(6, NULL, NULL, 30, 15, NULL, 17, 'mash potatoes'), (1, 3, 'tsp', 2, 1, NULL, 18, 'mash potatoes'),
	(3, 9, 'tsp', 2, 24, NULL, 19, 'mash potatoes'), (0.25, 0.25, 'tsp', 1, 16, NULL, 20, 'mash potatoes'),
	(0.25, 0.25, 'tsp', 1, 9, NULL, 21, 'mash potatoes'), (1, NULL, NULL, 27, 18, 'cubed', 22, NULL),
	(1, NULL, NULL, 30, 2, 'chopped', 23, NULL), (6, 18, 'tsp', 2, 1, NULL, 24, NULL), (6, NULL, NULL,  25, 3, 'chopped, finely', 25, NULL),
	(0.5, 226.8, 'g', 21, 4, 'quartered', 26, NULL), (0.25, 0.25, 'tsp', 1, 19, NULL, 27, NULL), (2, NULL, NULL, 27, 20, 'diced', 28, NULL),
	(2, NULL, NULL, 27, 21, 'cubed', 29, NULL), (1, NULL, NULL, 32, 22, 'drained', 30, NULL);
	
	
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
	-- END BUILD / POPULATE TABLES --
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------