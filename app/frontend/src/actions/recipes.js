import axios from 'axios'

import {GET_RECIPES} from './types'

//GET RECIPES
export const getRecipes = () => dispatch => {
    axios.get('/api/recipes/')
    .then(res => {
        dispatch({
            type: GET_RECIPES,
            payload: res.data
        })
    }).catch(err => console.log(err))
}