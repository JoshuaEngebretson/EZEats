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
	date_user_created DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Starter data for "user"
INSERT INTO "user"
	(username, password)
VALUES
	('test1', '$2a$10$mvHgC4madG9DTnjLL1knS.3eGwr5ygKraosNCj//F/6MYml4aPcye'), -- password is test1;
	

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
	('oil and vinegars'), ('produce'), ('alcohol'), ('spices'),
    ('condiments and sauces'), ('canned goods'), ('liquids'), ('dry goods'),
    ('breads'), ('meats'), ('baking supplies');


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
	('tsp', 'volume'), ('tbsp', 'volume'), ('cubic inch', 'volume'),
    ('fl oz', 'volume'), ('c', 'volume'), ('pt', 'volume'), ('qt', 'volume'),
    ('gal', 'volume'), ('cubic foot', 'volume'), ('l', 'volume'),
    ('ml', 'volume'), ('Imperial gallon', 'volume'), ('Imperial quart', 'volume'),
    ('Imperial pint', 'volume'), ('Imperial cup', 'volume'),
	('Imperial fluid ounce', 'volume'), ('Imperial tablespoon', 'volume'),
    ('Imperial teaspoon', 'volume');
	
-- Starter units - Mass
INSERT INTO units_of_measurement (unit, conversion_category)
VALUES
	('stone', 'mass'), ('kg', 'mass'), ('lb', 'mass'), ('oz', 'mass'),
    ('g', 'mass'), ('mg', 'mass');
	
-- Starter units - Other	
INSERT INTO units_of_measurement (unit, conversion_category)
VALUES
	('clove', 'other'), ('sprig', 'other'), ('whole', 'other'),
    ('small', 'other'), ('medium', 'other'), ('large', 'other'),
    ('14 oz can', 'other'), ('28 oz can', 'other'), ('divided', 'other'),
    ('bag', 'other'), ('dash', 'other');
	
	
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
	('olive oil', 1), ('onion', 2), ('garlic', 2), ('mushrooms', 2), ('whiskey', 3),
    ('carrots', 2), ('celery', 2), ('thyme', 4), ('garlic powder', 4),
    ('coconut aminos', 5), ('tomato paste', 6), ('water', 7), ('cornstarch', 11),
	('spinach', 2), ('klondike potatoes', 2), ('salt', 4), ('pepper', 4),
    ('eggplant', 2), ('red pepper flakes', 4), ('yellow bell pepper', 2),
    ('zucchini', 2), ('diced tomatoes', 6), ('basil', 4), ('coconut milk', 7),
    ('tomatoes, Roma', 2), ('balsamic vinegar', 1), ('black pepper', 4),
    ('canola oil', 1), ('sea salt', 4), ('baguette', 9), ('pasta, Rigatoni', 8),
    ('sun-dried tomatoes', 6), ('maple syrup', 5), ('red pepper flakes', 4),
	('oregano', 4), ('nutritional yeast', 8), ('red potatoes', 2),
    ('bacon, thick-cut', 10), ('applie cider vinegar', 1), ('whole-grain mustard', 4),
    ('mustard, Dijon', 5), ('sugar', 11), ('parsley', 4), ('vanilla extract', 11),
	('bourbon', 3), ('lemon juice', 7), ('orange bitters', 3), ('sparkling water', 7),
    ('cinnamon, sticks', 4), ('star anise', 4), ('chai tea', 8), ('chai tea syrup', 5),
    ('yellow onion', 2), ('applesauce', 6), ('coconut oil', 1), ('brown sugar', 11),
    ('xanthan gum', 11), ('flour', 11), ('cocoa powder', 11), ('baking powder', 11),
    ('chocolate chips', 11);
	

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
In the same pot, brown the bell peppers and zucchini. Add oil, if needed.
Return the eggplant mixture to the pot. Add the tomatoes and thyme. Stir well. Bring to a boil (add a small amount of water or stock if it looks like it’s just gonna burn) and simmer gently for 15 to 20 minutes.
Remove the thyme and add the basil. Adjust the seasoning.
Serve with pasta, rice, or just by itself.', 'https://images.immediate.co.uk/production/volatile/sites/30/2019/05/Ratatouille-ea27a5c.jpg?quality=90&webp=true&resize=300,272', 1, 1);


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
	(2, 2, 'tsp', 1, 1, NULL, 1, NULL), (0.5, NULL, NULL,  29, 2, 'chopped', 1, NULL),
    (4, NULL, NULL, 25, 3, 'chopped, finely', 1, NULL), (10, 283.5, 'g', 22, 4, 'sliced', 1, NULL),
    (0.25, 12.173, 'tsp', 5, 5, NULL, 1, NULL), (0.75, 36.519, 'tsp', 5, 6, 'chopped', 1, NULL),
    (1, 48.692, 'tsp', 5, 7, 'chopped', 1, NULL), (0.75, 0.75, 'tsp', 1, 8, 'dried', 1, NULL),
    (0.25, 0.25, 'tsp', 1, 9, NULL, 1, NULL), (1, 3, 'tsp', 2, 10, NULL, 1, NULL),
    (2, 2, 'tsp', 1, 11, NULL, 1, NULL), (0.5, 24.346, 'tsp', 5, 12, NULL, 1, NULL),
	(1, 3, 'tsp', 2, 13, 'mixed in 3 tbsp water', 1, NULL), (1, 48.692, 'tsp', 5, 14, NULL, 1, NULL),
	-- Potatoes for Bourguinon
	(6, NULL, NULL, 30, 15, NULL, 1, 'mash potatoes'), (1, 3, 'tsp', 2, 1, NULL, 1, 'mash potatoes'),
	(3, 9, 'tsp', 2, 24, NULL, 1, 'mash potatoes'), (0.25, 0.25, 'tsp', 1, 16, NULL, 1, 'mash potatoes'),
	(0.25, 0.25, 'tsp', 1, 9, NULL, 1, 'mash potatoes'),
	-- Ratatouille
	(1, NULL, NULL, 27, 18, 'cubed', 2, NULL), (1, NULL, NULL, 30, 2, 'chopped', 2, NULL),
    (6, 18, 'tsp', 2, 1, NULL, 2, NULL), (6, NULL, NULL, 25, 3, 'chopped, finely', 2, NULL),
    (0.5, 226.8, 'g', 21, 4, 'quartered', 2, NULL), (0.25, 0.25, 'tsp', 1, 19, NULL, 2, NULL),
    (2, NULL, NULL, 27, 20, 'diced', 2, NULL), (2, NULL, NULL, 27, 21, 'cubed', 2, NULL),
	(1, NULL, NULL, 32, 22, 'drained', 2, NULL), (4, NULL, NULL, 26, 8, NULL, 2, NULL),
    (0.25, 12.173, 'tsp', 5, 23, 'chopped', 2, NULL);
	
	
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
	-- END BUILD / POPULATE TABLES --
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------