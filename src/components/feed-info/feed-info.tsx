import { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { FeedInfoUI } from '../ui/feed-info';

export const FeedInfo: FC = () => {
  const { orders, total, totalToday } = useAppSelector((state) => state.feed);

  const readyOrders = orders
    .filter((order) => order.status === 'done')
    .map((order) => order.number)
    .slice(0, 10);

  const pendingOrders = orders
    .filter((order) => order.status === 'pending')
    .map((order) => order.number)
    .slice(0, 10);

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday, orders }}
    />
  );
};
