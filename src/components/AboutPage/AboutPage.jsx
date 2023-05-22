import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h2>About EZEats:</h2>
        
        <p>
          EZEats is a recipe application designed to simplify your meal planning
          and accommodate dietary restrictions such as food allergies and celiac
          disease. Upon signing up, users can easily add new recipes to their
          profile and organize them into categories, such as entrees or desserts.
        </p>
        
        <p>
          Once you have recipes added, you will be greeted with an initial view of
          different categories which expand to display the recipes within each
          category. You will also see your most cooked recipes, these are recipes
          that you have completed the most often (top 5).
        </p>
        
        <p>
          When you view an individual recipe, you will be able to add it to the
          weekly shopping list. There will be a shopping list view where you can
          see all the meals that have been added to the list, and specifically all
          the ingredients from ALL those meals added together into one list. For
          example,  if one recipe required ½ of an onion, and another calls for 2
          full onions, you would see something like 2 ½ onions. Users can also
          easily remove a meal from their list, which automatically updates the
          shopping list. In the example above, if the recipe requiring 2 whole
          onions was removed, the list will adjust to show only  ½ onion.
        </p>
        
        <p>
          EZEats streamlines the process of planning meals, organizing recipes,
          and generating comprehensive shopping lists. Whether you have specific
          dietary needs or simply want a more efficient approach to meal prep,
          EZEats is your go-to recipe app.
        </p>
        
      </div>
    </div>
  );
}

export default AboutPage;
