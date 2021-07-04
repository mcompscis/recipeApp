import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { loadRecipes } from '../reducers/recipeReducer';
import PreviewCard from './PreviewCard';
import recipe from '../services/recipe'


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
  const [recipeList, setRecipeList] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
      //dispatch(loadRecipes(pageNum))
      recipe.getList(pageNum).then(recipes =>
        setRecipeList(recipes)
      )
  }, [])

  const handleChange = async (event, value) => {
    setPageNum(value);
    const recipes = await recipe.getList(value)
    setRecipeList(recipes)
    window.scrollTo(0, 0)
  };

  return(
    <Container component="main" >
      <CssBaseline/>
        <div className={classes.flexbox}>
          {recipeList.map(recipe =>
            <PreviewCard recipe={recipe} key={recipe.recipe_id}/>
          )}
        </div>
        <div className={classes.flexbox}>
          <Pagination className="paginateDiv" count={10} onChange={handleChange} />
        </div>
    </Container>
  )
}

export default Homepage