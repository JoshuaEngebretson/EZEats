import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({type: 'FETCH_RECIPES'});
  }, [])

  const recipes = useSelector(store => store.recipes)
  const mostCooked = useSelector(store => store.mostCooked)
  

  return (
    <h1>Inside the logged in Home Page view</h1>
  )
}