-- Database should be titled EZEats

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
	id SERIAL NOT NULL,
	username VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL,
	date_user_created DATE NOT NULL DEFAULT CURRENT_DATE,
	CONSTRAINT user_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE recipes (
	id SERIAL NOT NULL,
	recipe_name VARCHAR NOT NULL,
	image_of_recipe VARCHAR,
	recipe_text TEXT NOT NULL,
	on_menu INTEGER NOT NULL DEFAULT 0,
	times_cooked INTEGER NOT NULL DEFAULT 0,
	date_recipe_added DATE NOT NULL DEFAULT CURRENT_DATE,
	user_id INTEGER NOT NULL,
	category_id INTEGER NOT NULL,
	CONSTRAINT recipes_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE ingredients (
	id SERIAL NOT NULL,
	ingredient_name VARCHAR NOT NULL,
	food_category_id INTEGER NOT NULL,
	CONSTRAINT ingredients_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE recipe_ingredients (
	id SERIAL NOT NULL,
	quantity DECIMAL NOT NULL,
	converted_quantity DECIMAL,
	converted_unit VARCHAR DEFAULT NULL,
	unit_id INTEGER NOT NULL,
	ingredients_id INTEGER NOT NULL,
	method VARCHAR DEFAULT NULL,
	recipe_id INTEGER NOT NULL,
	for_which_part VARCHAR DEFAULT NULL,
	CONSTRAINT recipe_ingredients_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE category (
	id SERIAL NOT NULL,
	name VARCHAR NOT NULL,
	CONSTRAINT category_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE food_categories (
	id SERIAL NOT NULL,
	food_category_name VARCHAR NOT NULL,
	CONSTRAINT food_categories_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE units_of_measurement (
	id SERIAL NOT NULL,
	unit VARCHAR NOT NULL,
	conversion_category VARCHAR NOT NULL,
	CONSTRAINT units_of_measurement_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);

ALTER TABLE recipes ADD CONSTRAINT recipes_fk0 FOREIGN KEY (user_id) REFERENCES "user"(id);
ALTER TABLE recipes ADD CONSTRAINT recipes_fk1 FOREIGN KEY (category_id) REFERENCES category(id);

ALTER TABLE ingredients ADD CONSTRAINT ingredients_fk0 FOREIGN KEY (food_category_id) REFERENCES food_categories(id);

ALTER TABLE recipe_ingredients ADD CONSTRAINT recipe_ingredients_fk0 FOREIGN KEY (unit_id) REFERENCES units_of_measurement(id);
ALTER TABLE recipe_ingredients ADD CONSTRAINT recipe_ingredients_fk1 FOREIGN KEY (ingredients_id) REFERENCES ingredients(id);
ALTER TABLE recipe_ingredients ADD CONSTRAINT recipe_ingredients_fk2 FOREIGN KEY (recipe_id) REFERENCES recipes(id);

-- Starter categories
INSERT INTO category (name)
	VALUES ('Entree'), ('Drink'), ('Dessert'), ('Side'), ('Appetizer');

-- starter food categories
INSERT INTO food_categories (food_category_name)
VALUES
	('oil'), ('produce'), ('alcohol'), ('spices'), ('sauces'), ('canned goods'), ('liquids'), ('dry goods');

-- starter ingredients
INSERT INTO ingredients (ingredient_name, food_category_id)
VALUES
	('olive oil', 1), ('onion', 2), ('garlic', 2), ('mushrooms', 2), ('whiskey', 3), ('carrots', 2), ('celery', 2), ('thyme', 4),
	('garlic powder', 4),('coconut aminos', 5), ('tomato paste', 6), ('water', 7), ('cornstarch', 8), ('spinach', 2),
	('klondike potatoes', 2), ('salt', 4), ('pepper', 4), ('eggplant', 2), ('red pepper flakes', 4), ('yellow bell pepper', 2),
	('zucchini', 2), ('diced tomatoes', 6), ('basil', 4), ('coconut milk', 7);

-- starter units of measurement - volume
INSERT INTO units_of_measurement (unit, conversion_category)
VALUES
	('tsp', 'volume'), ('tbsp', 'volume'), ('cubic inch', 'volume'), ('fl oz', 'volume'),
	('c', 'volume'), ('pt', 'volume'), ('qt', 'volume'), ('gal', 'volume'),
	('cubic foot', 'volume'), ('l', 'volume'), ('ml', 'volume'), ('Imperial gallon', 'volume'),
	('Imperial quart', 'volume'), ('Imperial pint', 'volume'), ('Imperial cup', 'volume'),
	('Imperial fluid ounce', 'volume'), ('Imperial tablespoon', 'volume'), ('Imperial teaspoon', 'volume');
	
-- starter units of measurement - mass
INSERT INTO units_of_measurement (unit, conversion_category)
VALUES
	('stone', 'mass'), ('kg', 'mass'), ('lb', 'mass'), ('oz', 'mass'), ('g', 'mass'), ('mg', 'mass');

-- starter units of measurement - other
INSERT INTO units_of_measurement (unit, conversion_category)
VALUES
	('clove', 'other'), ('sprig', 'other'), ('whole', 'other'), ('small', 'other'), ('medium', 'other'),
	('large', 'other'), ('14 oz can', 'other'), ('28 oz can', 'other');