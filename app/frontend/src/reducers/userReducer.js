import jwt_decode from "jwt-decode"
import user from '../services/user'

const initialState = {
  user_id: null,
  username: null,
  access_token: null,
  refresh_token: null,
}

export const login = data => {
  return async dispatch => {
    const details = jwt_decode(data.access)
    const loggedIn = { 
      user_id: details.user_id,
      username: details.username,
      access_token: data.access,
      refresh_token: data.refresh
    }
    dispatch({
      type: 'LOGIN_USER',
      data: loggedIn,
    })
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT_USER'
    })
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'LOGIN_USER':
      return action.data
    case 'LOGOUT_USER':
      return initialState
    default:
      return state
  }
}

export default reducer