import { FC } from 'react';
import { OrderDetailsUI, Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

export const OrderDetail: FC = () => {
  const orderRequest = useSelector(
    (state: RootState) => state.order.orderRequest
  );
  const orderNumber = useSelector(
    (state: RootState) => state.order.orderNumber
  );

  if (orderRequest) {
    return <Preloader />;
  }
  if (!orderNumber) {
    return null;
  }
  return <OrderDetailsUI orderNumber={orderNumber} />;
};
