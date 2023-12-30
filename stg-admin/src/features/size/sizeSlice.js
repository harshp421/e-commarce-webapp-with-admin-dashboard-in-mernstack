import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import sizeService from "./sizeService";

export const getsizes = createAsyncThunk(
  "size/get-sizes",
  async (thunkAPI) => {
    try {
      return await sizeService.getSizes();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createsize = createAsyncThunk(
  "size/create-size",
  async (sizeData, thunkAPI) => {
    try {
      return await sizeService.createSize(sizeData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAsize = createAsyncThunk(
  "size/get-size",
  async (id, thunkAPI) => {
    try {
      return await sizeService.getSize(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAsize = createAsyncThunk(
  "size/update-size",
  async (size, thunkAPI) => {
    try {
      return await sizeService.updateSize(size);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAsize = createAsyncThunk(
  "size/delete-size",
  async (id, thunkAPI) => {
    try {
      return await sizeService.deleteSize(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  sizes: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  createdSize:null,
  updatedSize:null
};
export const sizeSlice = createSlice({
  name: "sizes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getsizes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getsizes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        //console.log(action.payload);
        state.sizes = action.payload;
      })
      .addCase(getsizes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createsize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createsize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdSize = action.payload;
        //console.log(action.payload);
      })
      .addCase(createsize.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAsize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAsize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedSize = action.payload;
      })
      .addCase(updateAsize.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAsize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAsize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.SizeName = action.payload.title;
      })
      .addCase(getAsize.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAsize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAsize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedSize = action.payload.title;
      })
      .addCase(deleteAsize.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, (state) => {
        //console.log("Resetting state...");
        return initialState; // Reset the state to its initial state
      });
  },
});
export default sizeSlice.reducer;
