import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { createOrderRequestThunk } from '../../slices/createOrderSlice';
import { resetIngredients } from '../../slices/constructorSlice';
export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch<AppDispatch>();

  const constructorItems = useSelector(
    (state: RootState) => state.burgerConstructor
  );
  const orderRequest = useSelector(
    (state: RootState) => state.order.orderRequest
  );
  const orderModalData = useSelector(
    (state: RootState) => state.order.orderModalData
  );
  const orderSuccess = useSelector(
    (state: RootState) => state.createOrder.success
  );
  const accessToken = localStorage.getItem('accessToken');
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest || !accessToken) return;

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    if (orderSuccess) {
      dispatch(resetIngredients());
    }
    dispatch(
      createOrderRequestThunk({
        ingredients: ingredientsIds,
        token: accessToken
      })
    )
      .unwrap()
      .then(() => {
        dispatch(resetIngredients());
      })
      .catch(() => {});
  };
  const closeOrderModal = () => {};
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients?.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ) || 0),
    [constructorItems]
  );
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
