
const initialState = {
  name: ''
}

export const setSearchRecipeName = (name, page) => {
  const fullName = name === '' ? '' : `recipe_name=${name.toLowerCase().split(" ").join("%")}`
  return {
    type: 'SET_NAME_SEARCH',
    data: fullName
  }
}

const searchReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET_NAME_SEARCH':
      return {...state, name: action.data}
    default:
      return state
  }
}

export default searchReducer
