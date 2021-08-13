import axiosInstance from "./axiosApi";
import axios from 'axios'
import { setSearchExcludeIngredients } from "../reducers/searchReducer";

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

const getAdvancedSearch = async (name, includeingredient, excludeingredient, cuisines, tags, page) => {
  let url = baseUrl + `/advanced-search?page=${page}`
  url += name === '' ? '' : `&${name}`
  url += includeingredient === '' ? '' : `&${includeingredient}`
  url += excludeingredient === '' ? '' : `&${excludeingredient}`
  url += cuisines === '' ? '' : `&${cuisines}` 
  url += tags === '' ? '' : `&${tags}`
  const response = await axios.get(url)
  console.log(url)
  return response.data
}

const postRecipe = async (jsonObj) => {
  console.log('Trying to post recipe: ', jsonObj);
  const response = await axiosInstance.post('/recipes/create-recipe/', jsonObj);
  console.log('Posted recipe: ', jsonObj);
  console.log('Post response: ', response);
  return response;
}

const getTags = async () => {
  const response = await axios.get(baseUrl + `/get-tags/`)
  return response.data
}

const getCuisines = async () => {
  const response = await axios.get(baseUrl + `/get-cuisines/`)
  return response.data
}

const getIngredients = async () => {
  const response = await axios.get(baseUrl + `/get-ingredients/`)
  return response.data
}

export default { getList, getAmount, getDetail, getSearch, postRecipe, getTags, getCuisines, getIngredients, getAdvancedSearch }