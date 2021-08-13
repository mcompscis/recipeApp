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
import { Chip, List, ListItem } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { Button, Typography } from '@material-ui/core';

const Recipe = () => {

  const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 0,
  };

  const reviewContainer = {
    padding: '20px'
  };


  const [recipeDetail, setRecipeDetail] = useState({})
  const [tags, setTags] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [addReview, setAddReview] = useState(false);
  const id = useParams().id
  useEffect(() => {    
    recipe.getDetail(id).then(recipe => {
      setRecipeDetail(recipe);
      console.log(recipe);
      let tagsArr = recipe.tag_text.split(',');
      let instArr = recipe.recipe_text.split('.');
      let ingredientsArr = recipe.ingredients.split(',');
      let measure = recipe.measurement_units.split(',');
      let quantities = recipe.quantities.split(',');
      setTags(tagsArr);
      setInstructions(instArr);
      setIngredients(ingredientsArr);
      setMeasure(measure);
      setQuantities(quantities);
    });

    recipe.getReviews(id).then(res => {
      setReviews(res.key_results);
      console.log(res.key_results);
    })
  }, [])
  
  return (
    <MuiThemeProvider>
      <Container component='main' >
        <Typography variant="h3">{recipeDetail.recipe_name}</Typography>
        <Typography variant="body1">Author: {recipeDetail.username}, Date submitted: {recipeDetail.date_submitted}</Typography>
        <List style={flexContainer}>
          {tags.map((tag) => {
            return <ListItem button="true">{tag}</ListItem>;
          })}
        </List>
        <Typography variant="h5" >Description:</Typography>
        <Typography variant="body1" >{recipeDetail.description}</Typography>
        <img src={recipeDetail.img_url}></img>
        <Typography variant="h5" >Ingredients/Measurement/Quantites:</Typography>
        <List style={flexContainer}>
          {ingredients.map((ingredient) => {
            return <ListItem>{ingredient}</ListItem>;
          })}
        </List>
        <List style={flexContainer}>
          {measure.map((mes) => {
            return <ListItem>{mes}</ListItem>;
          })}
        </List>
        <List style={flexContainer}>
          {quantities.map((qua) => {
            return <ListItem>{qua}</ListItem>;
          })}
        </List>
        <Typography variant="h5" >Cooking Instructions:</Typography>
        <List>
          {instructions.map((inst) => {
            return <ListItem>{inst}</ListItem>;
          })}
        </List>
        <Typography variant="body1" >Cuisine: {recipeDetail.cuisine_name}, Calories: {recipeDetail.calories}, Serves: {recipeDetail.serves}, Time to Prepare: {recipeDetail.time_to_prepare}</Typography>
        {/* <p>Measurement Units: {recipeDetail.measurement_units}</p> */}
        <Typography variant="body1" >Num Ratings: {recipeDetail.num_ratings}, Avg Rating: {recipeDetail.avg_rating}</Typography>
        {/* <p>Quantities: {recipeDetail.quantities}</p> */}

        <Typography variant="h5" >Reviews and Ratings:</Typography>
        {/* <UploadRecipe
          open={addReview}
          onClose={() => setAddReview(false)}
        /> */}
        <Button variant="contained" onClick={() => setAddReview(true) }>Add Review</Button>
        <List>
          {reviews.map((review) => {
            return (
              <div style={reviewContainer}>
                <Typography variant="body1" >By: {review.username}, Rating: {review.rating}</Typography>
                <Typography variant="body1" >Review: {review.review}</Typography>
              </div>
            )
          })
          }
        </List>
      </Container>
       
    </MuiThemeProvider>
    
  )
}

export default Recipe