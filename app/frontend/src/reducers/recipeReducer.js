import recipe from '../services/recipe'

export const loadRecipes = (pageNumber) => {
    return async dispatch => {
        const recipes = await recipe.getList(pageNumber)
        dispatch({
            type: 'LOAD_RECIPES',
            data: recipes
        })
    }
}

const reducer = (state = [], action) => {
    switch(action.type){
        case 'LOAD_RECIPES':
            return action.data
        default:
            return state
    }
}

export default reducer