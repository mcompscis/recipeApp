import jwt_decode from "jwt-decode";
import user from '../services/user'

const initialState = {
  user_id: null,
  username: null,
  accessToken: null,
}

export const login = (username, password) => {
  return async dispatch => {
    const res = await user.login(username, password)
    const details = jwt_decode(res.data.access)
    const loggedIn = {
      user_id: details.user_id,
      username: details.username,
      accessToken: res.data.access
    }
    dispatch({
      type: 'LOGIN_USER',
      data: loggedIn,
    })
  }
}

export const logout = () => {
  return async dispatch => {
    const res = await user.login(username, password)
    const details = jwt_decode(res.data.access)
    const loggedIn = {
      user_id: details.user_id,
      username: details.username,
      accessToken: res.data.access
    }
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