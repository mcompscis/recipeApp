import React from 'react';
import { Button, List, Grid, Typography } from '@material-ui/core'
import RecipeItem from './RecipeItem';
import { recipes, users } from '../sampleData/sample'
import { useHistory } from 'react-router-dom';

const RecipeList = () => {
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
									key={rec.id}
									name={rec.name}
									average_rating={rec.average_rating}
									userid={rec.userid}
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
