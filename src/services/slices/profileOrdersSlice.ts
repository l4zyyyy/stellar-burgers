import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';

type ProfileOrdersState = {
  orders: TOrder[];
  connected: boolean;
};

const initialState: ProfileOrdersState = {
  orders: [],
  connected: false
};

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {
    wsConnect: (_state, _action) => {},
    wsDisconnect: () => {},
    wsOpen: (state) => {
      state.connected = true;
    },
    wsClose: (state) => {
      state.connected = false;
    },
    wsMessage: (state, action) => {
      state.orders = action.payload.orders;
    }
  }
});

export const { wsConnect, wsDisconnect, wsOpen, wsClose, wsMessage } =
  profileOrdersSlice.actions;

export default profileOrdersSlice.reducer;
