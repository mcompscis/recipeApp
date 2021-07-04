import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


const AddRecipeButton = ({onClick}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add" onClick={onClick}>
        <AddIcon />
      </Fab>
    </div>
  );
}

export default AddRecipeButton