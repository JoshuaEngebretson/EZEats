import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography,  } from "@mui/material";

export default function RecipeImageCard({recipe}) {
  const history = useHistory();

  const viewRecipe = () => {
    history.push(`/view-recipe/${recipe.id}`)
  }

  return (
    <Card 
      sx= {{
        width: 250, 
        height:300, 
        margin: 'auto', 
        mt:1,
        backgroundColor: '#dae2ed'
      }}
    >
      <CardActionArea
        onClick={viewRecipe}
      >
        {/* <CardHeader title={recipe.name} /> */}
        <CardMedia 
          sx={{ width: '90%', height: 200, margin: 'auto', pt: 1 }}
          component='img'
          image={recipe.image}
          alt={`An image of ${recipe.name}`}
        />
        <CardContent
          sx={{ textAlign: 'center', padding: 'auto'}}
        >
          <Typography variant='h6' component='div'>
            {recipe.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}