import './HomePage.css'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeImageCard from "../../ReusableComponents/RecipeImageCard/RecipeImageCard";
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

import { styled } from '@mui/material/styles';

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'FETCH_RECIPE_CATEGORIES'});
    dispatch({type: 'FETCH_RECIPES'});
    dispatch({type: 'FETCH_MOST_COOKED'});
  }, [])

  const categories = useSelector(store => store.recipes.recipeCategories)
  const mostCooked = useSelector(store => store.recipes.mostCooked)
  const recipes = useSelector(store => store.recipes.allRecipes)

  const [expanded, setExpanded] = React.useState('');

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

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  
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
      {/* Display the categories as expandable sections */}
      {categories.map(category => {
        const id = category.id
        return (
          <Accordion expanded={expanded === id} onChange={handleAccordionChange(id)}>
            <AccordionSummary aria-controls={id} id={id}>
              <Typography>{category.name}</Typography>
            </AccordionSummary>
            <AccordionDetails className='grid'>
              {/* <Typography className='grid'> */}
                {recipes.map(recipe => {
                  if (recipe.category === category.name) {
                    return (
                      <RecipeImageCard key={recipe.id} recipe={recipe} />
                    )
                  }
                })}
              {/* </Typography> */}
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}