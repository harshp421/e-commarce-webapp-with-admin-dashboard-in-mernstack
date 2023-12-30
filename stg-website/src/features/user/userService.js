import axios from "axios";
import { base_url, config } from "../../util/axiosConfig";
const register = async (userDate) => {
  const response = await axios.post(`${base_url}user/register`, userDate);
  if (response.data) {
    return response.data;
  }
};

const login = async (userDate) => {
  const response = await axios.post(`${base_url}user/login`, userDate);
  //console.log(response.data);
  if (response.data) {
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
    }
    return response.data;
  }
};

const getUserWishlist = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, config);
  if (response.data) {
    //console.log(response, "responce");
    return response.data;
  }
};

const AddToCart = async (cartData) => {
  const response = await axios.post(`${base_url}user/cart`, cartData, config);
  if (response.data) {
    //console.log(response, "responce");
    return response.data;
  }
};

const getCart = async () => {
  const response = await axios.get(`${base_url}user/cart`);
  if (response.data) {
    //console.log(response, "responce");
    return response.data;
  }
};

const removeProductFromCart = async (data) => {
  const response = await axios.delete(
    `${base_url}user/delete-product-cart/${data.cartItemId}`,

    data.config2
  );
  if (response.data) {
    //console.log(response, "responce");
    return response.data;
  }
};

const updateProductFromCart = async (cartDetails) => {
  const response = await axios.delete(
    `${base_url}user/delete-product-cart/${cartDetails.cartItemId}/${cartDetails.quantity}`,

    config
  );
  if (response.data) {
    //console.log(response, "responce");
    return response.data;
  }
};




const createOrder=async(orderDetail)=>{ 
  const response = await axios.post(`${base_url}user/cart/create-order`,orderDetail, config);
if (response.data) {
  //console.log(response, "responce");
  return response.data;
}
}


const getUserOrders=async()=>{ 
  const response = await axios.get(`${base_url}user/getmyorders`);
if (response.data) {
  //console.log(response, "responce");
  return response.data; 
}
}


const updateUser=async(data)=>{
  const response = await axios.put(`${base_url}user/edit-user`,data.data,data.config2);
  if (response.data) {
    //console.log(response, "responce of updation");
    return response.data;
  }
}



const forgotPassToken=async(data)=>{
  const response = await axios.post(`${base_url}user/forgot-password-token`,data);
  if (response.data) {
    //console.log(response, "responce of updation");
    return response.data;
  }
}



const resetpass=async(data)=>{
  const response = await axios.put
  (`${base_url}user/reset-password/${data.token}`,{password:data?.password});
  if (response.data) {
    //console.log(response, "responce of updation");
    return response.data;
  }
}


const emptyCart = async (data) => {
  //console.log(data,"header data");
  const response = await axios.delete(`${base_url}user/cart/empty-cart`,data);
  if (response.data) {
    //console.log(response, "responce");
    return response.data;
  }
};
export const authService = {
  register,
  login,
  getUserWishlist,
  AddToCart,
  getCart,
  removeProductFromCart,
  updateProductFromCart,
  createOrder,
  getUserOrders,
  updateUser,
  forgotPassToken,
  resetpass,
  emptyCart
};
