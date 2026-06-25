import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TIngredient,
  TOrder,
  TTabMode
} from '@utils-types';
import { BASE_URL } from '@api';
type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

type TIngredientsState = {
  ingredients: TIngredient[];
  error?: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  error: null
};
export function getIngredients(): Promise<TIngredientsResponse> {
  return fetch(`${BASE_URL}/ingredients`)
    .then((response) => response.json())
    .then((data: TIngredientsResponse) => data);
}
export const getIngredientsThunk = createAsyncThunk('/ingredients', () =>
  getIngredients()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.error = undefined;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload.data;
        state.error = undefined;
      })
      .addCase(getIngredientsThunk.rejected, (state) => {
        state.error = 'Не удалость загрузить ингредиениты';
      });
  }
});
export default ingredientsSlice.reducer;
