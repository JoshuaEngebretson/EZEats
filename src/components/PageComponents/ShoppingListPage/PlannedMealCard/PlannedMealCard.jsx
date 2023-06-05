import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography,  } from "@mui/material";
import Swal from "sweetalert2";

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
    Swal.fire({
      icon: 'warning',
      title: 'Remove from Shopping List',
      text: `Do you want to completely remove ${recipe.name} from your shopping list?`,
      showCancelButton: true,
      confirmButtonText: `Remove - ${recipe.name}`,
      confirmButtonColor: 'darkred',
      cancelButtonText: `Don't remove - ${recipe.name}`
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({type: 'REMOVE_RECIPE_FROM_MENU', payload: recipe.id})
        Swal.fire({
          icon: 'success',
          text: `${recipe.name} has been removed from your shopping list.`
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: 'info',
          text: `${recipe.name} has not been removed.`
        })
      }
    })
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
  )
}