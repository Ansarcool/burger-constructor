import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { getUserOrdersThunk } from '../../slices/orderSlice';
import { getIngredientsThunk } from '../../slices/ingredientsSlice';
import { getUserThunk } from '../../slices/slice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = [];
  const accessToken = localStorage.getItem('accessToken');
  const dispatch = useDispatch<AppDispatch>();
  if (accessToken) {
    useEffect(() => {
      if (accessToken && accessToken !== 'undefined') {
        dispatch(getUserOrdersThunk(accessToken));
      }
    }, []);
  }
  const orders = useSelector((state: RootState) => state.order.userOrders);
  return <ProfileOrdersUI orders={orders} />;
};
