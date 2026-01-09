import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';

type FeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  connected: boolean;
};

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  connected: false
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsConnect: (state, action: PayloadAction<string>) => {
      state.connected = false;
    },
    wsDisconnect: (state) => {
      state.connected = false;
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    },
    wsOpen: (state) => {
      state.connected = true;
    },
    wsClose: (state) => {
      state.connected = false;
    },
    wsMessage: (
      state,
      action: PayloadAction<{
        orders: TOrder[];
        total: number;
        totalToday: number;
      }>
    ) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  }
});

export const { wsConnect, wsDisconnect, wsOpen, wsClose, wsMessage } =
  feedSlice.actions;
export default feedSlice.reducer;
