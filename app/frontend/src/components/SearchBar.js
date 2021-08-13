import React, {useState} from 'react'
import { makeStyles, fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { setSearchRecipeName } from '../reducers/searchReducer'
import { useDispatch, useSelector } from 'react-redux'
import FilterListIcon from '@material-ui/icons/FilterList'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AdvancedSearch from './AdvancedSearch';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  search: {
    position: 'absolute',
    right: "45%",
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

const SearchBar = () => {
  const classes = useStyles() 
  const history = useHistory();
  const [openSearch, setOpenSearch] = useState(false)
  const dispatch = useDispatch()
  const nameSearched = useSelector(state => state.search.rawname)

  const handleChangeName = (event) => {
    history.push("/recipes")
    dispatch(setSearchRecipeName(event.target.value))
  }

  const handleClickOpen = () => {
    history.push("/recipes")
    setOpenSearch(true)
  }

  const handleClose = () => {
    setOpenSearch(false);
  }

  return(
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        value={nameSearched}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChangeName}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="advanced search"
              onClick={handleClickOpen}
            >
              {<FilterListIcon color="inherit"/>}
            </IconButton>
          </InputAdornment>
        }
      />
      <AdvancedSearch open={openSearch} handleClose={handleClose} handleClickOpen={handleClickOpen}/>
    </div>
  )
}

export default SearchBar