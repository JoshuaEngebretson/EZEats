import './HomePage.css'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeCategory from "./RecipeCategory/RecipeCategory";
import RecipeImageCard from "../../ReusableComponents/RecipeImageCard/RecipeImageCard";
import MuiAccordion from '@mui/material/Accordion';
import { styled } from '@mui/material/styles';


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'FETCH_RECIPE_CATEGORIES'});
    dispatch({type: 'FETCH_RECIPES'});
    dispatch({type: 'FETCH_MOST_COOKED'});
  }, [])

  const [expanded, setExpanded] = React.useState('panel1');

  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const categories = useSelector(store => store.recipes.recipeCategories)
  const mostCooked = useSelector(store => store.recipes.mostCooked)
  
  return (
    <div className='page-margin'>
      <h2>Most Prepared</h2>
      <div className="grid">
        {mostCooked.map(recipe => {
          return (
            <RecipeImageCard
              key={recipe.id}
              recipe={recipe}
            />
          )
        })}
      </div>
      <h2>Categories</h2>
      
      {categories.map(category => {
        const id = category.id
        return (
          <Accordion expanded={expanded === {id}} onChange={handleAccordionChange({id})}>
            <RecipeCategory
              key={category.id}
              category={category}
            />
          </Accordion>
        )
      })}
    </div>
  )
}