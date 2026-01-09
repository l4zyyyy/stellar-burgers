import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (ingredients: string[]) => {
    const res = await orderBurgerApi(ingredients);
    return res.order;
  }
);

interface OrderState {
  orderData: TOrder | null;
  orderRequest: boolean;
}

const orderSlice = createSlice({
  name: 'order',
  initialState: { orderData: null, orderRequest: false } as OrderState,
  reducers: {
    clearOrder: (state) => {
      state.orderData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderData = action.payload;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
