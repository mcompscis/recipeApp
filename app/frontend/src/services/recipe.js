import axiosInstance from "./axiosApi";

const getList = async (pageNumber) => {
  const response = await axiosInstance.get(`/recipes/get_recipes?page=${pageNumber}/`)
  return response;
}

export default {getList}