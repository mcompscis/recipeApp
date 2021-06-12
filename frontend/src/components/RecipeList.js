import React from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RecipeItem from './RecipeItem';
import { recipes, users } from '../sampleData/sample'

const RecipeList = () => {
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
		</div>
	);
};

export default RecipeList;
