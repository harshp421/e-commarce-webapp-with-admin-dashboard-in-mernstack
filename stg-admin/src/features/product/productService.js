import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};

const getSingleProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  //console.log(response, "single product responce");
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`);
  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};

const updateProduct=async(id,productData)=>{
  //console.log(id,productData,"before call");
  const responce = await axios.put(`${base_url}product/${id}`,productData)
  return responce.data;
}
const productService = {
  getProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct
};

export default productService;
