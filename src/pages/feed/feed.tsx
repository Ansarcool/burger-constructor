import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { getOrdersThunk } from '../../slices/orderSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.order.orders);
  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);
  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => dispatch(getOrdersThunk())} />;
};
