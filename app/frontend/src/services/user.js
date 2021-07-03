import axiosInstance from "./axiosApi";
import jwt_decode from "jwt-decode";

const login = async (username, password) => {
  try{
    const response = await axiosInstance.post('/users/login/', {username, password})
    axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    const details = jwt_decode(response.data.access)
    localStorage.setItem('username', details.username)
    localStorage.setItem('user_id', details.user_id)
    return response;
  }
  catch(error){
    //throw new Error('Invalid Username or Password')
  }
}

const register = async(username, password) => {
  try {
    const response = await axiosInstance.post('/users/register/', {username, password});
    return response;
  } 
  catch (error) {
      
  }
}

export default {login, register}
