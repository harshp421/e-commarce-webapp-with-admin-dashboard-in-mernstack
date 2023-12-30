import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";


export const registeuser = createAsyncThunk(
  "auth/register",
  async (userDate, thunkAPI) => {
    try {
      return await authService.register(userDate);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userDate, thunkAPI) => {
    try {
      return await authService.login(userDate);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserProductWishlist = createAsyncThunk(
  "user/wishlist",
  async (thunkAPI) => {
    try {
      return await authService.getUserWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "user/cart/add",
  async (cartData, thunkAPI) => {
    try {
      //console.log(cartData, "cartData");
      return await authService.AddToCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getUserCart = createAsyncThunk(
  "user/cart/get",
  async (thunkAPI) => {
    try {
      return await authService.getCssart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const deleteUserCart = createAsyncThunk(
  "user/cart/delete",
  async (data,thunkAPI) => {
    try {
      return await authService.emptyCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const DeleteCartProduct = createAsyncThunk(
  "user/cart/product/delete",
  async (data, thunkAPI) => {
    try {
      //console.log(data, "cartItemId");
      return await authService.removeProductFromCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCartProduct = createAsyncThunk(
  "user/cart/product/update",
  async (cartDetails, thunkAPI) => {
    try {
      return await authService.updateProductFromCart(cartDetails);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAnorder = createAsyncThunk(
  "user/cart/create-order",
  async (orderDetail, thunkAPI) => {
    try {
      return await authService.createOrder(orderDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getOrders= createAsyncThunk(
  "user/orders/get",
  async (thunkAPI) => {
    try {
      return await authService.getUserOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const  updateProfile= createAsyncThunk(
  "user/profile/update",
  async (data, thunkAPI) => {
    try {
      return await authService.updateUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const  forgotPasswordToken= createAsyncThunk(
  "user/password/token",
  async (data, thunkAPI) => {
    try {
      return await authService.forgotPassToken(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const  resetPassword= createAsyncThunk(
  "user/password/change",
  async (data, thunkAPI) => {
    try {
      return await authService.resetpass(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");


const getCusromerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialState = {
  user: getCusromerfromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(registeuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registeuser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
        //console.log(state, "state");
        //console.log(action.payload);
        if (state.isSuccess === true) {
          toast.info("User Created SuccessFully");
        }
      })
      .addCase(registeuser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;

        if (state.isError === true) {
          toast.error(action.payload.response.data.message);

        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        //console.log(action.payload);
        localStorage.setItem("token", action.payload.token);
        if (state.isSuccess === true) {
          toast.success("User login SuccessFully");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;

        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(getUserProductWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProductWishlist.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.wistlist = action.payload;
      })
      .addCase(getUserProductWishlist.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addProductToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cartProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Product Added to cart");
        }
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cartProducts = action.payload;
        //console.log(action.payload, "cart data in user slice");
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(DeleteCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteCartProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.DeleteCartProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success("Product Delete from Cart Success");
        }
      })
      .addCase(DeleteCartProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.success("somthing went wrong");
        }
      })
      .addCase(updateCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updateCartProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success("Product Updated From cart Success");
        }
      })
      .addCase(updateCartProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.success("somthing went wrong");
        }
      })
      .addCase(createAnorder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAnorder.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orderProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success("Ordered Successfully");
        }
      })
      .addCase(createAnorder.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.success("somthing went wrong");
        }
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.getorderdProduct = action.payload;
       
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.success("somthing went wrong");
        }
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedUserData = action.payload;

        let currentUserData=JSON.parse(localStorage.getItem("customer"));
        let newUserData={
           _id:currentUserData?._id,
           token:currentUserData?.token,
           firstname:action?.payload?.firstname,
           lastname:action?.payload?.lastname,
           email:action?.payload?.email,
           mobile:action?.payload?.mobile
        }

        localStorage.setItem("customer",JSON.stringify(newUserData))
        state.user=newUserData;
        toast.success("Profile Updated Successfully")
       
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.success("somthing went wrong");
        }
      })
      .addCase(forgotPasswordToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordToken.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.token= action.payload;
        if (state.isSuccess === true) {
          toast.success("Forget Password email send Successfully");
        }
      })
      .addCase(forgotPasswordToken.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.success("somthing went wrong");
        }
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.pass= action.payload;
        if (state.isSuccess === true) {
          toast.success("password update Successfully");
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.success("somthing went wrong");
        }
      })
      .addCase(deleteUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteCart= action.payload;
        if (state.isSuccess === true) {
          toast.success("cart Empty Successfully");
        }
      })
      .addCase(deleteUserCart.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.success("somthing went wrong");
        }
      }).addCase(resetState, () => initialState);
  },
});




export default authSlice.reducer;
