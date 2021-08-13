import React, {useState, useEffect} from 'react'
import PreviewCard from './PreviewCard';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
  flexbox: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
  },
  root: {
    margin: 10,
    flex: "0 0 23.5%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "15%%"
  }
});

const ResultList = ({recipes}) => {
  const classes = useStyles()
  let loading = useSelector(state => state.loading)

  return(
    <div className={classes.flexbox}>
        {loading ? 
        [...Array(48).keys()].map(idx => 
          <Skeleton key={idx} className={classes.root} variant="rect" width={261} height={346} />
        )
        :
        recipes.map(recipe =>
          <PreviewCard recipe={recipe} key={recipe.recipe_id}/>
        )}
    </div>
  )
}

export default ResultList