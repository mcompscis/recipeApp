import axios from 'axios'

import {GET_RECIPES} from './types'

//GET RECIPES
export const getRecipes = () => {
    const request = axios.get('/api/recipes/')
    return request.then(response => response.data)
}

export default { getRecipes }