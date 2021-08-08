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
  const [pageNum, setPageNum] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [recipeList, setRecipeList] = useState([])
  const [recipeCreate, setRecipeCreate] = useState(false)

  let searchName = useSelector(state => state.search.name)
  const returnResults = async (page) => {
    if(searchName === ''){
      let res = await recipe.getList(page)
      setPageCount(res.num_pages) 
      setRecipeList(res.recipes)
    }
    else {
      let res = await recipe.getSearch(searchName, page)
      setPageCount(res.num_pages)
      setRecipeList(res.key_results)
    }
  }
  
  useEffect(() => {
    returnResults(pageNum)
  }, [searchName])

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