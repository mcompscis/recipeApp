import React, {useState, useEffect} from 'react'
import PreviewCard from './PreviewCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  flexbox: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
  },
});

const ResultList = ({recipes}) => {
  const classes = useStyles()
  return(
    <div className={classes.flexbox}>
        {recipes.map(recipe =>
          <PreviewCard recipe={recipe} key={recipe.recipe_id}/>
        )}
    </div>
  )
}

export default ResultList