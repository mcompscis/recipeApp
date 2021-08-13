import React from 'react'
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from  '@material-ui/icons/menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../reducers/userReducer'
import SearchBar from './SearchBar'
import jwt_decode from "jwt-decode"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: "white"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const NavBarButtons = () => {
  let dispatch = useDispatch()
  const classes = useStyles()
  let user = useSelector(state => state.user)

  const expired = (token = user.access_token) => {
    if (token && jwt_decode(token)) {
      const expiry = jwt_decode(token).exp
      const now = new Date()
      if(now.getTime() > expiry * 1000){
        dispatch(logout())
        return true
      }
      return false
    }
    return false;
  }

  if (user.username != null && !expired()){
    return(
      <div className={classes.root}>
         <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              component={Link} 
              to={'/account'}
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
          <Typography variant="h6" className={classes.title} component={Link} to={''} >
            Recipefy
          </Typography>
          <SearchBar/>
          <div>
            <NavBarButtons/>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar