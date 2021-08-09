import axiosInstance from "./axiosApi";
import axios from 'axios'

//const baseUrl = 'http://ubuntu2004-002.student.cs.uwaterloo.ca:8000/api/recipes'
const baseUrl = 'http://localhost:8000/api/recipes'

const getList = async (pageNumber) => {
  const response = await axios.get(baseUrl + `/get-recipes?page=${pageNumber}`)
  return response.data;
}

const getAmount = async () => {
  const response = await axios.get(baseUrl + `/amount`)
  return response.data;
}

const getDetail = async (id) => {
  const response = await axios.get(baseUrl + `/detail/${id}/`)
  return response.data;
}

const getSearch = async (search, page) => {
  let url = baseUrl + `/search-recipe?${search}&page=${page}`
  const response = await axios.get(url)
  return response.data
}

const postRecipe = async (jsonObj) => {
  console.log('Trying to post recipe: ', jsonObj);
  const response = await axiosInstance.post('/recipes/create-recipe/', jsonObj);
  console.log('Posted recipe: ', jsonObj);
  console.log('Post response: ', response);
  return response;
}

export default { getList, getAmount, getDetail, getSearch, postRecipe }