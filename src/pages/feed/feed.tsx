import { FC, useEffect } from 'react';
import { FeedUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { wsConnect, wsDisconnect } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();

  const { orders, total, totalToday } = useAppSelector((state) => state.feed);

  useEffect(() => {
    dispatch(wsConnect('wss://norma.education-services.ru/orders/all'));
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  if (!orders.length) return <p style={{ textAlign: 'center' }}>Загрузка...</p>;

  return (
    <FeedUI
      orders={orders}
      total={total}
      totalToday={totalToday}
      handleGetFeeds={() =>
        dispatch(wsConnect('wss://norma.education-services.ru/orders/all'))
      }
    />
  );
};
