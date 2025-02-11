import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

// Initial State
const initialState = {
  cart: [],
  isCartError: false,
  cartCount: 0,
  isCartSuccess: false,
  isCartLoading: false,
  cartMessage: "",
};

// Add item to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.addToCart(productId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Get cart items
export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await cartService.getCart(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
}); 

// Update cart item quantity
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.updateCartItem(productId, quantity, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Remove item from cart
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.removeCartItem(productId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Clear entire cart
export const clearCart = createAsyncThunk("cart/clearCart", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await cartService.clearCart(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.cart = [];
      state.isCartError = false;
      state.isCartSuccess = false;
      state.isCartLoading = false;
      state.cartMessage = "";
    },
    updateCartCount: (state) => {
        // Update cart count based on items
        state.cartCount = state.cartItems.reduce((total, item) => total + item.quantity, 0);
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.isCartSuccess = true;
        state.cart.push(action.payload);
        state.cartCount++;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isCartLoading = false;
        state.isCartError = true;
        state.cartMessage = action.payload;
      })
      .addCase(getCart.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.isCartSuccess = true;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isCartLoading = false;
        state.isCartError = true;
        state.cartMessage = action.payload;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.isCartSuccess = true;
        state.cart = state.cart.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isCartLoading = false;
        state.isCartError = true;
        state.cartMessage = action.payload;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.isCartSuccess = true;
        state.cart = state.cart.filter((item) => item.productId !== action.payload);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isCartLoading = false;
        state.isCartError = true;
        state.cartMessage = action.payload;
      })
      .addCase(clearCart.pending, (state) => {
        state.isCartLoading = true;
      });
    },
  });
      

export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;