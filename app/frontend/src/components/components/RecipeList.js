import React, { Component, Fragment, useState, useEffect } from 'react';
import { Button, List, Grid, Typography } from '@material-ui/core'
import RecipeItem from './RecipeItem';
//import { recipes, users } from '../sampleData/sample'
import { useHistory } from 'react-router-dom';

import recipeService from '../../actions/recipes'

const RecipeList = ({recipes}) => {
	const history = useHistory();

	return (
		<div>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<Typography variant="h6">
						List of recipes
					</Typography>
					<div>
						<List>
							{recipes.map((rec) => (
								<RecipeItem
									key={rec.recipe_id}
									name={rec.recipe_name}
									average_rating={rec.avg_rating}
									userid={rec.creator_id} 
								/>
							))}
						</List>
					</div>
				</Grid>
			</Grid>
			<div>
				<Button variant="contained">Create Recipe</Button>
				<Button variant="contained" onClick={() => history.push('/')}>Go Back</Button>
			</div>
		</div>
	);
};

export default RecipeList;