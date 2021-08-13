import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import recipe from '../services/recipe'
import AddRecipeButton from './AddRecipeButton';
import UploadRecipe from './UploadRecipe';
import ResultList from './ResultList';
import { setLoading, setDoneLoading } from '../reducers/loadingReducer';

const useStyles = makeStyles({
  flexbox: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
  },
  paginateDiv: {
    marginBottom: 25,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
  },
  paginate: {
    justifyContent: "center",
  }
});

const Homepage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [pageNum, setPageNum] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [recipeList, setRecipeList] = useState([])
  const [recipeCreate, setRecipeCreate] = useState(false)

  let searchName = useSelector(state => state.search.name)
  let searchIncludeIngredients = useSelector(state => state.search.includeingredient)
  let searchExcludeIngredients = useSelector(state => state.search.excludeingredient)
  let searchIncludeCuisines = useSelector(state => state.search.includecuisine)
  let searchIncludeTags = useSelector(state => state.search.includetags)

  const returnResults = async (page) => {
    if(searchName === '' && searchIncludeIngredients === '' && searchExcludeIngredients === '' && searchIncludeCuisines === '' && searchIncludeTags === ''){
      let res = await recipe.getList(page)
      setPageCount(res.num_pages) 
      setRecipeList(res.recipes)
      Array.isArray(res.recipes) ? setRecipeList(res.recipes) :  setRecipeList([res.recipes])
    }
    else if(searchIncludeIngredients === '' && searchExcludeIngredients === '' && searchIncludeCuisines === '' && searchIncludeTags === ''){
      let res = await recipe.getSearch(searchName, page)
      setPageCount(res.num_pages)
      Array.isArray(res.key_results) ? setRecipeList(res.key_results) :  setRecipeList([res.key_results])
    }
    else {
      let res = await recipe.getAdvancedSearch(searchName, searchIncludeIngredients, searchExcludeIngredients, searchIncludeCuisines, searchIncludeTags, page)
      setPageCount(res.num_pages)
      Array.isArray(res.key_results) ? setRecipeList(res.key_results) : setRecipeList([res.key_results])
    }
    dispatch(setDoneLoading())
  }
  
  useEffect(() => {
    dispatch(setLoading())
    returnResults(pageNum)
  }, [searchName, searchIncludeIngredients, searchExcludeIngredients, searchIncludeCuisines, searchIncludeTags])

  const handleChange = async (event, value) => {
    event.preventDefault();
    setPageNum(value);
    returnResults(value)
    window.scrollTo(0, 0)
  };

  const appendRecipeList = () => {}

  return(
    <Container component="main" >
      <CssBaseline/>
        <UploadRecipe
          open={recipeCreate}
          onClose={() => setRecipeCreate(false)}
          appendRecipeList={appendRecipeList}
        />
        <ResultList recipes={recipeList}/>
        <div className={classes.flexbox}>
          <Pagination className="paginateDiv" count={pageCount} onChange={handleChange} />
        </div>
        <AddRecipeButton onClick={() => setRecipeCreate(true) } />
    </Container>
  )
}

export default Homepage