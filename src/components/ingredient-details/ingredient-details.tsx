import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { useParams } from 'react-router-dom';
export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  // const ingredientData = null;
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );
  const ingredientData = ingredients.find((item) => item._id === id);
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
