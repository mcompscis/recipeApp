import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import recipe from '../services/recipe'
import AutoCompleteTags from './AutoCompleteTags';
import { useDispatch, useSelector } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress';
import { setSearchRecipeName, 
          setSearchIncludeIngredients,
          setSearchExcludeIngredients,
          setSearchIncludeCuisines,
          setSearchIncludeTags,
          setDoneTrue,
          setDoneFalse } from '../reducers/searchReducer'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AdvancedSearch = ({open, handleClose, handleClickOpen}) => {
  const dispatch = useDispatch()
  const nameSearched = useSelector(state => state.search.rawname)
  let loading = useSelector(state => state.loading)

  const [cuisines, setCuisines] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [tags, setTags] = useState([])

  const [includeIngredients, setIncludeIngredients] = useState([])
  const [excludeIngredients, setExcludeIngredients] = useState([])
  const [includeCuisines, setIncludeCuisines] = useState([])
  const [includeTags, setIncludeTags] = useState([])

  useEffect(() => {    
    recipe.getCuisines().then(res =>
      setCuisines(res.map(res => res.cuisine_name))
    )

    recipe.getIngredients().then(res =>
      setIngredients(res.map(res => res.ingredient_name))
    )

    recipe.getTags().then(res =>
      setTags(res.map(res => res.tag_text))
    )
  }, [])

  const handleChangeName = (event) => {
    dispatch(setSearchRecipeName(event.target.value))
  }

  const handleChangeExIng = (value) => {
    dispatch(setSearchExcludeIngredients(value))
  }

  const handleChangeIncIng = (value) => {
    dispatch(setSearchIncludeIngredients(value))
  }

  const handleChangeIncCuisine = (value) => {
    dispatch(setSearchIncludeCuisines(value))
  }

  const handleChangeIncTag = (value) => {
    dispatch(setSearchIncludeTags(value))
  }

  const handleDone = () => {
    //dispatch(setDoneFalse())
    dispatch(setDoneTrue())
    handleClose()
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {loading && <LinearProgress/> }
        <DialogContent>
          <TextField
            value={nameSearched}
            autoFocus
            margin="normal"
            id="name"
            label="Search"
            type="text"
            fullWidth
            onChange={handleChangeName}
          />

          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <AutoCompleteTags action={handleChangeIncIng} options={ingredients} value={includeIngredients} setValue={setIncludeIngredients} label={"Include Ingredients"} />
            <AutoCompleteTags action={handleChangeExIng} options={ingredients} value={excludeIngredients} setValue={setExcludeIngredients} label={"Exclude Ingredients"} />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <AutoCompleteTags action={handleChangeIncCuisine} options={cuisines} value={includeCuisines} setValue={setIncludeCuisines} label={"Cuisines"} />
            <AutoCompleteTags action={handleChangeIncTag} options={tags} value={includeTags} setValue={setIncludeTags} label={"Tags"} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDone} color="primary">
            Search
          </Button>   
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdvancedSearch
