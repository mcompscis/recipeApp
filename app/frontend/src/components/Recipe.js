import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import recipe from '../services/recipe'
import UploadReview from './UploadReview'

var capitalize = require('capitalize')

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
import { Button, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Typography } from '@material-ui/core';

const Recipe = () => {

  const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 0,
  };

  const [reviewCreate, setReviewCreate] = useState(false)
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
  const [rows, setRows] = useState([]);
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

  useEffect(() => {
    if (ingredients !== null && measure !== null && quantities !== null) {

      let tableRows = [];
      let ingredientLen = ingredients.length;

      for (let i = 0; i < ingredientLen; ++i) {
        let obj = {
          "key": i,
          "ingredient_name": ingredients[i],
          "measurement_type": measure[i],
          "quantity": quantities[i]
        }
        tableRows.push(obj);
      }
      setRows(tableRows);
    }
  }, [ingredients, measure, quantities])
  
  return (
    <MuiThemeProvider>
      <Container component='main' >
      <CssBaseline/>
        <Typography variant="h3">{capitalize.words(recipeDetail.recipe_name??"")}</Typography>
        <UploadReview
            open={reviewCreate}
            onClose={() => setReviewCreate(false)}
            id={id}
          />
        <Typography variant="body1">Author: {recipeDetail.username}, Date submitted: {recipeDetail.date_submitted}</Typography>
        <List style={flexContainer}>
          {tags.map((tag) => {
            return <ListItem button="true">{tag}</ListItem>;
          })}
        </List>
        <Typography variant="h5" >Description:</Typography>
        <Typography variant="body1" >{recipeDetail.description}</Typography>
        <img src={recipeDetail.img_url}></img>

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><strong>Ingredient</strong></TableCell>
                <TableCell align="right"><strong>Quantity</strong></TableCell>
                <TableCell align="right"><strong>Measurement Type</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.key}>
                  <TableCell component="th" scope="row">
                    {row.ingredient_name}
                  </TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.measurement_type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


        <Typography variant="h5">Cooking Instructions:</Typography>
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
        <Button variant="contained" onClick={() => setReviewCreate(true) }>Add Review</Button>
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