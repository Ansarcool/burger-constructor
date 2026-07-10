import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useDispatch } from '../../services/store';
import { getUserOrdersThunk } from '../../slices/slice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = [];
  const accesstoken = localStorage.getItem('accessToken');
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.auth.userOrders) || [];
  useEffect(() => {
    if (accesstoken) {
      dispatch(getUserOrdersThunk(accesstoken));
    }
  }, [dispatch]);
  return <ProfileOrdersUI orders={orders} />;
};
