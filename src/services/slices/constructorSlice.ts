import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '../../utils/types';
import { nanoid } from 'nanoid';

type ConstructorState = {
  bun: TConstructorIngredient | null; // теперь bun тоже TConstructorIngredient
  ingredients: TConstructorIngredient[];
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = { ...action.payload, uuid: nanoid() }; // добавляем uuid
      } else {
        state.ingredients.push({
          ...action.payload,
          uuid: nanoid()
        });
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.uuid !== action.payload
      );
      // если удаляем булку — сбрасываем
      if (state.bun?.uuid === action.payload) {
        state.bun = null;
      }
    },
    resetConstructor: () => initialState
  }
});

export const { addIngredient, removeIngredient, resetConstructor } =
  constructorSlice.actions;
export default constructorSlice.reducer;
