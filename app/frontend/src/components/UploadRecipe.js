import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
const humanizeDuration = require("humanize-duration");
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import recipe from '../services/recipe'
import Autocomplete from "@material-ui/lab/Autocomplete";
import IngredientInput from "./IngredientInput"
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

const UploadRecipe = ({open, onClose, appendRecipeList }) => {
  const classes = useStyles();

  const [newName, setNewName] = useState('New Recipe');
  const [newServes, setServes] = useState(1);
  const [newPreparation, setPreparation] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCalories, setCalories] = useState(100);
  const [newCuisine, setCuisine] = useState('');
  const [newPrepTime, setPrepTime] = useState(90);
  const [autoCompleteValue, setAutoCompleteValue] = useState([]);
  const [ingredientRows, setIngredientRows] = useState([{}])
  const [image, setImage] = useState({})

  const [success, setSuccess] = useState(false);

  const [cuisines, setCuisines] = useState([])
  const [tags, setTags] = useState([])

  useEffect(() => {    
    recipe.getCuisines().then(res =>
      setCuisines(res.map(res => res.cuisine_name))
    )

    recipe.getTags().then(res =>
      setTags(res.map(res => res.tag_text))
    )

  }, [])

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  const clearState = () => {
    setNewName('New Recipe')
    setServes(1)
    setPreparation('')
    setNewDescription('')
    setCalories(100)
    setCuisine('')
    setPrepTime(90)
    setAutoCompleteValue([])
    setIngredientRows([])
    setIngredientRows([{}])
    setImage({})
  }

  const handleSave = async() => {
    var bodyFormData = new FormData()
    const data = {
      "recipe_name": newName,
      "recipe_text": newPreparation,
      "description": newDescription,
      "calories": newCalories,
      "time_to_prepare": newPrepTime,
      "serves": newServes,
      "ingredient_names": ingredientRows.map(row => row.ingredient),
      "quantities": ingredientRows.map(row => row.quantity),
      "measurement_units": ingredientRows.map(row => row.measurement),
      "cuisine_name": newCuisine,
      "tags": autoCompleteValue
    }
    bodyFormData.append('data', JSON.stringify(data))
    bodyFormData.append('file', image)
    try {
      const response = await recipe.postRecipe(bodyFormData)
      clearState()
      toast.success('Submitted Recipe', {
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
      toast.error('Error Submitting Recipe', {
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
      <DialogTitle id="form-dialog-title">
        {newName}
        <Typography>
          Serves {newServes} in {humanizeDuration(newPrepTime*60000, { delimiter: " and " })}{" "}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          value={newName}
          autoFocus
          margin="normal"
          id="name"
          label="Name"
          type="text"
          fullWidth
          onChange={event => setNewName(event.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <TextField
            className={classes.textField}
            value={newServes}
            margin="normal"
            id="serves"
            label="Serves"
            type="number"
            onChange={event => setServes(event.target.value)}
          />
          <TextField
            className={classes.textField}
            value={newCalories}
            margin="normal"
            id="calories"
            label="Calories"
            type="number"
            onChange={event => setCalories(event.target.value)}
          />
          <TextField
            className={classes.textField}
            value={newPrepTime}
            margin="normal"
            id="preptime"
            label="Prep Time (mins)"
            type="number"
            onChange={event => setPrepTime(event.target.value)}
          />
          <Autocomplete
            className={classes.textField}
            id="combo-box-demo"
            value={newCuisine}
            options={cuisines}
            onChange={(event, value) => setCuisine(value)}
            renderInput={(params) => <TextField {...params} label="Cuisine" />}
          />
        </div>
        <TextField
          margin="normal"
          id="preparation"
          label="Preparation Instructions"
          type="text"
          value={newPreparation}
          fullWidth
          multiline
          onChange={event => setPreparation(event.target.value)}
        />
        <TextField
          margin="normal"
          id="description"
          label="Description (optional)"
          type="text"
          value={newDescription}
          fullWidth
          multiline
          onChange={event => setNewDescription(event.target.value)}
        />
        <br/>
        <br/>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={tags}
        value={autoCompleteValue}
        onChange={(e, newval, reason) => {
          setAutoCompleteValue(newval);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Tags"
            onKeyDown={(e) => {
              if (e.keyCode === 13 && e.target.value) {
                setAutoCompleteValue(autoCompleteValue.concat(e.target.value));
              }
            }}
          />
        )}
      />
      <IngredientInput setRows={setIngredientRows} rows={ingredientRows}/>
      </DialogContent>
      <DialogActions>
        <div className={classes.uploadBtn}>
          <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={(event) => setImage(event.target.files[0])} />
          <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
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
            {success ? <CheckIcon /> : "Submit Recipe"}
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
  );
}

export default UploadRecipe