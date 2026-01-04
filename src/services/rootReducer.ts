import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/constructorSlice';
import feedReducer from './slices/feedSlice';
import profileOrdersReducer from './slices/profileOrdersSlice';
import authReducer from './slices/authSlice';
import orderReducer from './slices/orderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerconstructor: constructorReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer,
  auth: authReducer,
  order: orderReducer
});

export type RootState = ReturnType<typeof rootReducer>;
