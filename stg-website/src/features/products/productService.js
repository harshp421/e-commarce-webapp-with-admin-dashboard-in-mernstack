import axios from "axios";
import { base_url, config } from "../../util/axiosConfig";

const getProducts = async (data) => {
  //console.log(data,"data filter");
  const response = await axios.get(`${base_url}product?${data?.brand?`brand=${data?.brand}&&`:""}${data?.tag?`tags=${data?.tag}&&`:""}${data?.category?`category=${data?.category}&&`:""}${data?.minPrice?`price[gte]=${data?.minPrice}&&`:""}${data?.maxPrice?`price[lte]=${data?.maxPrice}&&`:""}${data?.sort?`sort=${data?.sort}&&`:""}${data?.currentPage?`page=${data?.currentPage}&&`:""}${data?.postsPerPage?`limit=${data?.postsPerPage}&&`:""}
  `);
 // //console.log(response.data, "api");
  if (response.data) {
    return response.data;
  }
};

const getSingleProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
 // //console.log(response.data, "Single api");
  if (response.data) {
    return response.data;
  }
};

const addToWishList = async (productId) => {
  const response = await axios.put(
    `${base_url}product/wishlist`,
    { productId } );
  //console.log(response.data, "api");
  if (response.data) {
    
    return response.data;
  }
};

const rateaProduct = async (data) => {
  const response = await axios.put(
    `${base_url}product/rating`,
     data,
    data.config3
  );
  //console.log(response.data, "review responce");
  if (response.data) {
    return response.data;
  }
}

export const productService = {
  getProducts,
  addToWishList,
  getSingleProduct,
  rateaProduct
};
