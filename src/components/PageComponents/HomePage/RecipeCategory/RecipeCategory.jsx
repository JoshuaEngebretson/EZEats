import RecipeImageCard from "../../../ReusableComponents/RecipeImageCard/RecipeImageCard"
import { useSelector } from "react-redux"
import React, { useState } from "react"
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

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

export default function RecipeCategory({category}) {
  const recipes = useSelector(store => store.recipes.allRecipes)
  const [categoryOpen, setCategoryOpen] = useState(false)

  const expandCategory = () => {
    if (categoryOpen) {
      setCategoryOpen(false)
    }
    else {
      setCategoryOpen(true)
    }
  }

  if (categoryOpen) {
    return (
      <div>
        <h4 onClick={expandCategory}>{category.name}</h4>
        <div className="grid">
          {
            recipes.map(recipe => {
              console.log(recipe.category);
              if (recipe.category === category.name) {
                return (
                  <RecipeImageCard key={recipe.id} recipe={recipe} />
                )
              }
            })
          }
        </div>
      </div>
    )
  }
  return (
    <div>
      <h4 onClick={expandCategory}>{category.name}</h4>
    </div>
  )
}