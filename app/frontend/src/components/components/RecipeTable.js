import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { recipes } from '../sampleData/sample';
import { useHistory } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import _ from "lodash";


const RecipeTable = ({recipesL}) => {

	const history = useHistory();
	const [recipesList, setRecipesList] = useState(recipesL);
	const [openCreate, setOpenCreate] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [newRecipeName, setNewRecipeName] = useState(null);
	const [newRecipeAvgRating, setNewRecipeAvgRating] = useState(null);
	const [newRecipeUserId, setNewRecipeUserId] = useState(null);
	const [recipeIdCounter, setRecipeIdCounter] = useState(0);
	const [currentRecipeId, setCurrentRecipeId] = useState(null);

	const [ascendingOrder, setAscendingOrder] = useState(false);

	const compareBy = (key) => {
		if (ascendingOrder) {
			return function(a, b) {
				if (a[key] < b[key]) return -1;
				if (a[key] > b[key]) return 1;
				return 0;
			};
		}
		else {
			return function(a, b) {
				if (a[key] > b[key]) return -1;
				if (a[key] < b[key]) return 1;
				return 0;
			};
		}
	};

	const sortBy = (key) => {
		const tempRecipesList = [...recipesList];
		tempRecipesList.sort(compareBy(key));
		setAscendingOrder(!ascendingOrder);
		setRecipesList(tempRecipesList);
	};

	const setEditDialog = (recipeId) => {
		const modifiedRecipeId = recipesList.findIndex((recipe) => recipe.recipe_id === recipeId);
		const modifiedRecipe = recipesList[modifiedRecipeId];
		setNewRecipeName(modifiedRecipe.name);
		setNewRecipeAvgRating(modifiedRecipe.average_rating);
		setNewRecipeUserId(modifiedRecipe.userid);
		setCurrentRecipeId(modifiedRecipeId);
		setOpenEdit(true);
	};

	const editRecipe = () => {
		const tempRecipesList = [...recipesList];
		const oldRecipe = tempRecipesList[currentRecipeId];
		const newRecipe = {
			id: oldRecipe.recipe_id,
			name: newRecipeName ?? oldRecipe.recipe_name,
			image_url: "tempurl",
			average_rating: newRecipeAvgRating ?? oldRecipe.avg_rating,
			userid: newRecipeUserId ?? oldRecipe.creator_id
		};
		tempRecipesList[currentRecipeId] = newRecipe;
		console.log('Edited item', newRecipe);
		setRecipesList(tempRecipesList);
		setNewRecipeName(null);
		setNewRecipeAvgRating(null);
		setNewRecipeUserId(null);
		setOpenEdit(false)
	}

	const saveRecipe = () => {

		if (!_.isNull(newRecipeName) && !_.isNull(newRecipeAvgRating) && !_.isNull(newRecipeUserId)) {
			const tempRecipesList = [...recipesList];
			const newRecipe = {
				id: recipeIdCounter,
				name: newRecipeName,
				image_url: "tempurl",
				average_rating: newRecipeAvgRating,
				userid: newRecipeUserId
			};
			const newRecipeIdCounter = recipeIdCounter + 1;
			tempRecipesList.push(newRecipe);
			console.log('Created item', newRecipeName, newRecipeAvgRating, newRecipeUserId);
			setRecipesList(tempRecipesList);
			setNewRecipeName(null);
			setNewRecipeAvgRating(null);
			setNewRecipeUserId(null);
			setRecipeIdCounter(newRecipeIdCounter);
			setOpenCreate(false)
		}
			
	};

	const clearRecipeInputs = () => {
		setNewRecipeName(null);
		setNewRecipeAvgRating(null);
		setNewRecipeUserId(null);
		setOpenCreate(false)
		setOpenEdit(false)
	};

	const removeItem = (itemId) => {
		const tempRecipesList = recipesList.filter((item) => item.recipe_id !== itemId);
		console.log('Removed item', itemId);
		setRecipesList(tempRecipesList);
	};

	useEffect(() => {
		const intialCount = recipesL.length + 1;
		setRecipeIdCounter(intialCount);
	}, [])

	return (
		<div>
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell onClick={() => sortBy('id')}>Recipe ID</TableCell>
							<TableCell align="right" onClick={() => sortBy('name')}>Name</TableCell>
							<TableCell align="right" onClick={() => sortBy('average_rating')}>Avg. Rating</TableCell>
							<TableCell align="right" onClick={() => sortBy('userid')}>User</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{recipesList.map((rec) => (
							<TableRow key={rec.recipe_id}>
								<TableCell component="th" scope="row">{rec.recipe_id}</TableCell>
								<TableCell align="right">{rec.recipe_name}</TableCell>
								<TableCell align="right">{rec.avg_rating}</TableCell>
								<TableCell align="right">{rec.creator_id}</TableCell>
								<TableCell align="right">
									<Button variant="contained" onClick={() => setEditDialog(rec.recipe_id)}>Edit</Button>
								</TableCell>
								<TableCell align="right">
								<Button variant="contained" onClick={() => removeItem(rec.recipe_id)}>Delete</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<div>
				<Button variant="contained" onClick={() => setOpenCreate(true)}>Create Recipe</Button>
				<Button variant="contained" onClick={() => history.push('/')}>Go Back</Button>
			</div>
			<Dialog open={openCreate} onClose={() => setOpenCreate(false)} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Create</DialogTitle>
				<DialogContent>
					<DialogContentText>Create your own recipe</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Recipe Name"
						onChange={e => setNewRecipeName(e.target.value)}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="avg_rating"
						label="Average Rating"
						onChange={e => setNewRecipeAvgRating(e.target.value)}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="userid"
						label="User Id"
						onChange={e => setNewRecipeUserId(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => clearRecipeInputs()} color="primary">
						Cancel
					</Button>
					<Button onClick={() => saveRecipe()} color="primary">
						Create
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={openEdit} onClose={() => clearRecipeInputs()} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Edit</DialogTitle>
				<DialogContent>
					<DialogContentText>Edit the recipe</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Recipe Name"
						defaultValue={newRecipeName}
						onChange={e => setNewRecipeName(e.target.value)}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="avg_rating"
						label="Average Rating"
						defaultValue={newRecipeAvgRating}
						onChange={e => setNewRecipeAvgRating(e.target.value)}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="userid"
						label="User Id"
						defaultValue={newRecipeUserId}
						onChange={e => setNewRecipeUserId(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => clearRecipeInputs()} color="primary">
						Cancel
					</Button>
					<Button onClick={() => editRecipe()} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default RecipeTable;