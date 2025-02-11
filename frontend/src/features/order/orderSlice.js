import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
  orders: [],
  order: null, 
  isOrderLoading: false,
  isOrderSuccess: false,
  isOrderError: false,
  orderMessage: "", 
};

// Place an order
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await orderService.placeOrder( token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "Order failed");
    }
  }
);

// Fetch user orders
export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await orderService.getOrders(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "Failed to fetch orders");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.isOrderLoading = false;
      state.isOrderSuccess = false;
      state.isOrderError = false;
      state.orderMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderSuccess = true;
        state.order = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderError = true;
        state.orderMessage = action.payload;
      })
      .addCase(getOrders.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderError = true;
        state.orderMessage = action.payload;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
