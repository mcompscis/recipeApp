import React, { useState, useEffect } from "react"
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";

const measurements = ["teaspoon(s)", "tablespoon(s)", "cup(s)", "ml", "l", "mg", "g", "kg"]

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  textField: {
    marginRight: theme.spacing(1),
    width: 170
  },
}));

const IngredientRow = ({index, setRows, rows}) => {
  const classes = useStyles()
  const [quantity, setQuantity] = useState("")
  const [measurement, setMeasurement] = useState("")
  const [ingredient, setIngredient] = useState("")

  const newQuantity = event => {
    setQuantity(event.target.value)
    updateRow({measurement, ingredient, quantity: event.target.value})
  }

  const newMeasurement = val => {
    setMeasurement(val)
    updateRow({measurement: val, ingredient, quantity})
  }

  const newIngredient = val => {
    setIngredient(val)
    updateRow({measurement, ingredient: val, quantity})
  }

  const updateRow = (newRow) => {
    let newArr = [...rows]
    newArr[index] = newRow
    setRows(newArr)
  }

  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <TextField
          className={classes.textField}
          id="standard-number"
          label="Quantity"
          type="number"
          onChange={newQuantity}
          value={quantity}
          required
        />
      <Autocomplete
            id="combo-box-demo"
            className={classes.textField}
            options={measurements}
            value={measurement}
            onChange={event => setCuisine(event.target.value)}
            renderInput={(params) => <TextField {...params} label="Measurement" />}
            onChange={(event, value) => newMeasurement(value)}
      />
      <TextField 
          className={classes.textField} 
          required label="Ingredient"  
          value={ingredient}
          onChange={event => newIngredient(event.target.value)}/>
    </div>
  )
}


const IngredientInput = ({rows, setRows}) => {
  const classes = useStyles();

  const addIngredient = () => {
    setRows(rows.concat({}))
  }

  return (
    <div>
      {rows.map((row, index) =>
        <IngredientRow key={index} index={index} setRows={setRows} rows={rows}/>
      )}
      <Button
        variant="text"
        color="default"
        onClick={() => addIngredient()}
      >
        add row
      </Button>
    </div>
  )
  
}

export default IngredientInput