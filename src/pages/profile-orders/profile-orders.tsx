import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = [];
  const orders = useSelector((state: RootState) => state.order.orders);
  return <ProfileOrdersUI orders={orders} />;
};
