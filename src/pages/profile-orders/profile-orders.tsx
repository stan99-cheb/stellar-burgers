import { FC, useEffect } from 'react';
import { getOrders } from '../../services/slices/ordersSlice';
import { ProfileOrdersUI } from '@ui-pages';
import { selectors } from '@selectors';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectors.orders.getOrders);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
