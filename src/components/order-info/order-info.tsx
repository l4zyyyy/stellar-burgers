import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const ingredients = useAppSelector((state) => state.ingredients.items);

  const orderData =
    useAppSelector((state) =>
      state.feed.orders.find((o) => o.number === Number(number))
    ) ||
    useAppSelector((state) =>
      state.profileOrders.orders.find((o) => o.number === Number(number))
    );

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);
    const ingredientsInfo: any = {};

    orderData.ingredients.forEach((id) => {
      const ingredient = ingredients.find((i) => i._id === id);
      if (!ingredient) return;

      ingredientsInfo[id] = ingredientsInfo[id]
        ? { ...ingredientsInfo[id], count: ingredientsInfo[id].count + 1 }
        : { ...ingredient, count: 1 };
    });

    const total = Object.values(ingredientsInfo).reduce(
      (acc: number, item: any) => acc + item.price * item.count,
      0
    );

    return { ...orderData, ingredientsInfo, date, total };
  }, [orderData, ingredients]);

  if (!orderInfo) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
