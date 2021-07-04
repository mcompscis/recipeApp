import axiosInstance from "./axiosApi";
import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/api/recipes'

const getList = async (pageNumber) => {
  const response = await axios.get(baseUrl + `/get_recipes?page=${pageNumber}`)
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

export default { getList, getAmount, getDetail }