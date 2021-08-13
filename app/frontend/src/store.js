import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import userReducer from './reducers/userReducer'
import recipeReducer, {loadRecipes} from './reducers/recipeReducer'
import searchReducer from './reducers/searchReducer'
import loadingReducer from './reducers/loadingReducer'

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['search']
};

const reducer = combineReducers({
  search: searchReducer,
  user: userReducer,
  recipes: recipeReducer,
  loading: loadingReducer
})

const pReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
    pReducer,
    composeWithDevTools(applyMiddleware(thunk))
) 

export const persistor = persistStore(store);
 
//store.dispatch(loadRecipes(1))

//export default store 