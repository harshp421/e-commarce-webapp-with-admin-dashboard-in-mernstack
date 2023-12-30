import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { productService } from "./productService";

export const getAllProducts = createAsyncThunk(
  "product/get",
  async (data, thunkAPI) => {
    try {
      return await productService.getProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAProduct = createAsyncThunk(
  "product/getAproduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getSingleProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToWishList = createAsyncThunk(
  "product/wishlist",
  async (productId, thunkAPI) => {
    try {
      return await productService.addToWishList(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addRating = createAsyncThunk(
  "product/rating",
  async (data, thunkAPI) => {
    try {
      return await productService.rateaProduct(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const productState = {
  product: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  compareProduct: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {
    addToCompare(state, action) {
      state.compareProduct.push(action.payload);
    },
    removeFromCompare(state, action) {
      const filterProduct = [...state.compareProduct];
      const updatedProduct = filterProduct.filter((element) => {
        return element._id !== action.payload._id;
      });
      state.compareProduct = updatedProduct;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(addToWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.addToWishList = action.payload;
         console.log(action.payload);
        state.message = "Product added ";
        toast.success("Product Added  to wishlist successfully");
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        console.log(action,"action");
        if (state.isSuccess === false) {
          toast.success("Login to add Product in WishList ");
        }
      })
      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.singleproduct = action.payload;
        state.message = "Product fatch Successfully";
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.rating = action.payload;
        state.message = "rating added Successfully";
        if (state.isSuccess === true) {
          toast.success("Review Added  Successfully");
        }
      })
      .addCase(addRating.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default productSlice.reducer;
export const { addToCompare, removeFromCompare } = productSlice.actions;
