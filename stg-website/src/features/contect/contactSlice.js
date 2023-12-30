import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { contactService } from "./contactService";


export const createQuery = createAsyncThunk(
  "contact/post",
  async (contactDate, thunkAPI) => {
    try {
      return await  contactService.postQuery(contactDate);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const addToWishList = createAsyncThunk(
//   "product/wishlist",
//   async (productId, thunkAPI) => {
//     try {
//       return await productService.addToWishList(productId);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

const contactState = {
  contact: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const contactSlice = createSlice({
  name: "contact",
  initialState: contactState,
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(createQuery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuery.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.contact = action.payload;
        if(state.isSuccess === true)
        {
            toast.success("Contact form Submit successfully")
        }
      })
      .addCase(createQuery.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("Sumthing want Wrong");
        }
      });
  },
});

export default contactSlice.reducer;
