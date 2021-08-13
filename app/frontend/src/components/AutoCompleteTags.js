import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import recipe from '../services/recipe'
import { Autocomplete, createFilterOptions } from "@material-ui/lab";

const OPTIONS_LIMIT = 15;
const defaultFilterOptions = createFilterOptions();

const filterOptions = (options, state) => {
  return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

const AutoCompleteTags = ({options, value, setValue, label, action}) => {
  const classes = useStyles()
  return (
    <Autocomplete
      multiple
      fullWidth
      filterOptions={filterOptions}
      className={classes.margin}
      options={options}
      value={value}
      onChange={(e, newval, reason) => {
        setValue(newval)
        action(newval)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          onKeyDown={(e) => {
            if (e.keyCode === 13 && e.target.value) {
              setValue(value.concat(e.target.value))
              action(value.concat(e.target.value))
            }
            else{
              action(value)
            }
          }}
        />
      )}
    />
  )
}

export default AutoCompleteTags