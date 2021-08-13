import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { green } from "@material-ui/core/colors";
import CheckIcon from "@material-ui/icons/Check";
import recipe from '../services/recipe'
import Autocomplete from "@material-ui/lab/Autocomplete";
import Rating from '@material-ui/lab/Rating';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(theme => ({
  uploadBtn: {
    position: "absolute",
    left: 10
  },
  textField: {
    marginRight: theme.spacing(1),
    marginTop: "3vw",
    width: 200
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  input: {
    display: "none"
  }
}));

const UploadRecipe = ({open, onClose, id }) => {
  const classes = useStyles();

  const [reviewText, setReviewText] = useState('');
  const [reviewValue, setReviewValue] = useState(0)

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  const clearState = () => {
    setReviewText('')
    setReviewValue(0)
  }

  const handleSave = async() => {
    const data = {
      "rating": reviewValue,
      "review": reviewText,
      "recipe_id": id,
    }
    try {
      const response = await recipe.postReview(data)
      toast.success('Submitted Review', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      clearState
      return response
    } 
    catch (error) {
      clearState()
      toast.error('Error Submitting Review', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >

      <DialogContent>
        <TextField
          value={reviewText}
          autoFocus
          margin="normal"
          id="review"
          label="Review"
          type="text"
          fullWidth
          onChange={event => setReviewText(event.target.value)}
        />
        
        <Rating
          name="review-value"
          value={reviewValue}
          precision={0.5}
          onChange={(event, newValue) => {
            setReviewValue(newValue);
          }}
        />
              
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            className={success ? classes.buttonSuccess : null}
            onClick={() => handleSave()}
          >
            {success ? <CheckIcon /> : "Save"}
          </Button>
        </div>
      </DialogActions>

      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
    </Dialog>
  )
}

export default UploadRecipe