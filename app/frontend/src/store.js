import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import userReducer from './reducers/userReducer'
import recipeReducer, {loadRecipes} from './reducers/recipeReducer'

const reducer = combineReducers({
  user: userReducer,
  recipes: recipeReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
) 
 
//store.dispatch(loadRecipes(1))

export default store 