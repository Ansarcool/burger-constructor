import { FC } from 'react';
import { OrderDetailsUI, Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

export const OrderDetail: FC = () => {
  const orderSuccess = useSelector(
    (state: RootState) => state.createOrder.success
  );
  const orderNumber = useSelector(
    (state: RootState) => state.createOrder.order.number
  );

  if (!orderSuccess) {
    return <Preloader />;
  }
  if (!orderNumber) {
    return null;
  }
  return <OrderDetailsUI orderNumber={orderNumber} />;
};
