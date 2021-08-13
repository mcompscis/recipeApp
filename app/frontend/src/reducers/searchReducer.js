
const initialState = {
  name: '',
  rawname: '',
  includeingredient: '',
  excludeingredient: '',
  includecuisine: '',
  includetags: ''
}

export const setSearchRecipeName = (name, page) => {
  const fullName = name === '' ? '' : `recipe_name=${name.toLowerCase().split(" ").join("%")}`
  return {
    type: 'SET_NAME_SEARCH',
    fullname: fullName,
    rawname: name
  }
}

export const setSearchIncludeIngredients = (ingredients, page) => {
  ingredients = ingredients.map(ingredient => ingredient.split(" ").join("%"))
  const querystring = ingredients.length === 0 ? '' : `included_ingredients=${ingredients.join(',')}`
  return {
    type: 'SET_INCLUDE_INGREDIENTS',
    data: querystring
  }
}

export const setSearchExcludeIngredients = (ingredients, page) => {
  ingredients = ingredients.map(ingredient => ingredient.split(" ").join("%"))
  const querystring = ingredients.length === 0 ? '' : `excluded_ingredients=${ingredients.join(',')}`
  return {
    type: 'SET_EXCLUDE_INGREDIENTS',
    data: querystring
  }
}

export const setSearchIncludeCuisines = (cuisines, page) => {
  cuisines = cuisines.map(cuisine => cuisine.split(" ").join("%"))
  const querystring = cuisines.length === 0 ? '' : `cuisines=${cuisines.join(',')}`
  return {
    type: 'SET_INCLUDE_CUISINES',
    data: querystring
  }
}

export const setSearchIncludeTags = (tags, page) => {
  tags = tags.map(tag => tag.split(" ").join("%"))
  const querystring = tags.length === 0 ? '' : `tags=${tags.join(',')}`
  return {
    type: 'SET_INCLUDE_TAGS',
    data: querystring
  }
}

const searchReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET_NAME_SEARCH':
      return {...state, name: action.fullname, rawname: action.rawname }
    case 'SET_INCLUDE_INGREDIENTS':
      return {...state, includeingredient: action.data}
    case 'SET_EXCLUDE_INGREDIENTS':
      return {...state, excludeingredient: action.data}
    case 'SET_INCLUDE_CUISINES':
      return {...state, includecuisine: action.data}
    case 'SET_INCLUDE_TAGS':
      return {...state, includetags: action.data}
    default:
      return state
  }
}

export default searchReducer
