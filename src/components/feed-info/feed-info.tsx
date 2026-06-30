import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { AppDispatch, RootState } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersThunk } from '../../slices/orderSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);
  const orders = useSelector((state: RootState) => state.order.orders);
  const feed = useSelector((state: RootState) => ({
    total: state.order.total,
    totalToday: state.order.totalToday
  }));

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
