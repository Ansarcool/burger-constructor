import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};
const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};
export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const item = {
        ...action.payload,
        id: crypto.randomUUID()
      };
      if ((item.type = 'bun')) {
        state.bun = item;
      } else {
        state.ingredients.push(item);
      }
    },
    removeIngredients: (
      state: TConstructorState,
      action: PayloadAction<string>
    ) => {
      if (state.bun?.id === action.payload) {
        state.bun = null;
      } else {
        state.ingredients = state.ingredients.filter(
          (i) => i.id !== action.payload
        );
      }
    },
    resetIngredients: (
      state: TConstructorState,
      action: PayloadAction<string>
    ) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});
export const { addIngredient, removeIngredients, resetIngredients } =
  constructorSlice.actions;
export default constructorSlice.reducer;
