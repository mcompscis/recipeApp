import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from  '@material-ui/icons/menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const NavBarButtons = () => {
  const classes = useStyles();
  let loggedIn = false
  if(localStorage.getItem('username')){
    loggedIn = true
    //let loggedInUser = localStorage.getItem('username')
  }
  if (!loggedIn){
    return(
      <div className={classes.root}>
         <IconButton
              edge="end"
              aria-label="account of current user"
              //aria-controls={menuId}
              aria-haspopup="true"
              //onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
          </IconButton>
      </div>
    )
  }
  return (
    <div className={classes.root}>
      <Button component={Link} to={'/login'} color="inherit">Login</Button>
      <Button component={Link} to={'/signup'} color="inherit">Sign Up</Button>
    </div>
  );
}

const Navbar = () => {
  const classes = useStyles() 

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Recipefy
          </Typography>
          <div>
            <NavBarButtons/>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar