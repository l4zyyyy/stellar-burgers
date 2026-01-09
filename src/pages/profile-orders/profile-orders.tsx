import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  wsConnect,
  wsDisconnect
} from '../../services/slices/profileOrdersSlice';
import { getCookie } from '../../utils/burger-api';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.profileOrders.orders);

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      const token = accessToken.replace('Bearer ', '');
      dispatch(
        wsConnect(`wss://norma.education-services.ru/orders?token=${token}`)
      );
    }

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
