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
      if (item.type === 'bun') {
        state.bun = item;
      } else {
        state.ingredients.push(item);
      }
    },
    removeIngredients: (
      state: TConstructorState,
      action: PayloadAction<string>
    ) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload
      );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;

      if (index === 0) {
        return;
      }

      const currentItem = state.ingredients[index];
      const prevItem = state.ingredients[index - 1];

      state.ingredients[index - 1] = currentItem;
      state.ingredients[index] = prevItem;
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;

      const currentItem = state.ingredients[index];
      const prevItem = state.ingredients[index + 1];

      state.ingredients[index + 1] = currentItem;
      state.ingredients[index] = prevItem;
    }
  }
});
export const {
  addIngredient,
  removeIngredients,
  moveIngredientUp,
  moveIngredientDown
} = constructorSlice.actions;
export default constructorSlice.reducer;
