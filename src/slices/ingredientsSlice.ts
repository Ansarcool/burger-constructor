import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from '@api';

export type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error?: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  loading: true,
  error: null
};
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
        state.loading = true;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload.data;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(getIngredientsThunk.rejected, (state) => {
        state.error = 'Не удалость загрузить ингредиениты';
        state.loading = false;
      });
  }
});
export default ingredientsSlice.reducer;
