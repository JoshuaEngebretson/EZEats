-- Database should be titled EZEats

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
	id SERIAL NOT NULL,
	username VARCHAR (80) NOT NULL UNIQUE,
	password VARCHAR (1000) NOT NULL,
	email VARCHAR,
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
	unit VARCHAR NOT NULL,
	ingredients_id INTEGER NOT NULL,
	method VARCHAR NOT NULL,
	recipe_id INTEGER NOT NULL,
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

ALTER TABLE recipes ADD CONSTRAINT recipes_fk0 FOREIGN KEY (user_id) REFERENCES "user"(id);
ALTER TABLE recipes ADD CONSTRAINT recipes_fk1 FOREIGN KEY (category_id) REFERENCES category(id);

ALTER TABLE ingredients ADD CONSTRAINT ingredients_fk0 FOREIGN KEY (food_category_id) REFERENCES food_categories(id);

ALTER TABLE recipe_ingredients ADD CONSTRAINT recipe_ingredients_fk0 FOREIGN KEY (ingredients_id) REFERENCES ingredients(id);
ALTER TABLE recipe_ingredients ADD CONSTRAINT recipe_ingredients_fk1 FOREIGN KEY (recipe_id) REFERENCES recipes(id);
