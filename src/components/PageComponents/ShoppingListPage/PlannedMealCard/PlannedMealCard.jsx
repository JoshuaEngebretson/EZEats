import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography,  } from "@mui/material";

export default function PlannedMealCard({recipe}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const decreaseOnMenu = () => {
    if (recipe.on_menu > 1){
      dispatch({type:'DECREASE_ON_MENU', payload: recipe.id})
    }
    else {
      console.log('clicked decrease but unable to go below 0');
    }
  }

  const increaseOnMenu = () => {
    dispatch({type:'INCREASE_ON_MENU', payload: recipe.id})
  }

  const removeFromMenu = () => {
    console.log('clicked removeFromMenu');
    if (confirm(`Are you sure you want to completely remove ${recipe.name} from your shopping list?`)) {
        console.log('you clicked okay');
        dispatch({type: 'REMOVE_RECIPE_FROM_MENU', payload: recipe.id})
    } else {
      console.log('you clicked cancel');
    }
  }

  const viewRecipe = () => {
    console.log(`Clicked on ${recipe.name}`);
    history.push(`/view-recipe/${recipe.id}`)
  }

  return (
    <Card 
      sx={{
        width: 250, 
        height: 275, 
        margin: 1, 
        mt:1,
        backgroundColor: '#dae2ed',
        textAlign: 'center'
      }}
    >
      <CardActionArea
        onClick={viewRecipe}
      >
        <CardMedia 
          sx={{ width: '90%', height: 150, margin: 'auto', pt: 1 }}
          component='img'
          image={recipe.image}
          alt={`An image of ${recipe.name}`}
        />
      </CardActionArea>
      <CardContent
        sx={{ textAlign: 'center', padding: 'auto'}}
      >
        <button onClick={decreaseOnMenu} className='subtract inline'>-</button>
        <p className='inline'>{recipe.on_menu}</p>
        <button onClick={increaseOnMenu} className='add inline'>+</button>
        <button onClick={removeFromMenu} className='inline'>❌</button>
        <Typography variant='h6' component='div'>
          {recipe.name}
        </Typography>
      </CardContent>
    </Card>
    // <div className='planned-meal-card'>
    //   <div onClick={viewRecipe}>
    //     <h5>{recipe.name}</h5>
    //     <img 
    //       src={recipe.image}
    //       alt ={`An image of ${recipe.name}`}
    //       className='square-image-small'
    //     /> 
    //   </div>
    //   <div>
    //   </div>
    // </div>
  )
}