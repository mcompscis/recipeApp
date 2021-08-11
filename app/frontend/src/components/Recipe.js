import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import recipe from '../services/recipe'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
} from "react-router-dom"

const Recipe = () => {
  const [recipeDetail, setRecipeDetail] = useState({})
  const id = useParams().id
  useEffect(() => {    
    recipe.getDetail(id).then(recipe =>
      setRecipeDetail(recipe)
    )
    
  }, [])
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <h1>{recipeDetail.recipe_name}</h1>
      <img src={recipeDetail.img_url}></img>
      <p>Calories: {recipeDetail.calories}</p>
      <p>Cuisine: {recipeDetail.cuisine_name}</p>
      <p>Date submitted: {recipeDetail.date_submitted}</p>
      <p>Description: {recipeDetail.description}</p>
      <p>Ingredients: {recipeDetail.ingredients}</p>
      <p>Measurement Units: {recipeDetail.measurement_units}</p>
      <p>Num Ratings: {recipeDetail.num_ratings}</p>
      <p>Quantities: {recipeDetail.quantities}</p>
      <p>Recipe Text: {recipeDetail.recipe_text}</p>
      <p>Serves: {recipeDetail.serves}</p>
      <p>Tags: {recipeDetail.tag_text}</p>
      <p>Time to Prepare: {recipeDetail.time_to_prepare}</p>
    </Container>
  )
}

export default Recipe