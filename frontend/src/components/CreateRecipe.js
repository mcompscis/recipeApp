import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const CreateRecipe = () => {
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Create</DialogTitle>
			<DialogContent>
				<DialogContentText>Create your own recipe</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Recipe Name"
					onChange={() => handleChange}
				/>
				<TextField
					autoFocus
					margin="dense"
					id="avg_rating"
					label="Average Rating"
				/>
				<TextField
					autoFocus
					margin="dense"
					id="userid"
					label="User Id"
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleClose} color="primary">
					Create
				</Button>
			</DialogActions>
		</Dialog>
    );
};

export default CreateRecipe;
