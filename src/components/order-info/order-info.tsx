import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const ingredients: TIngredient[] =
    useAppSelector((state) => state.ingredients.items) || [];
  const feedOrders = useAppSelector((state) => state.feed.orders) || [];
  const profileOrders =
    useAppSelector((state) => state.profileOrders.orders) || [];

  const orderData = useMemo(
    () =>
      [...feedOrders, ...profileOrders].find(
        (o) => o.number === Number(number)
      ),
    [feedOrders, profileOrders, number]
  );

  const orderInfo = useMemo(() => {
    if (!orderData || ingredients.length === 0) return null;

    const date = new Date(orderData.createdAt);
    type TIngredientWithCount = TIngredient & { count: number };
    const ingredientsInfo: Record<string, TIngredientWithCount> = {};

    orderData.ingredients.forEach((id) => {
      const ingredient = ingredients.find((i) => i._id === id);
      if (!ingredient) return;

      if (!ingredientsInfo[id]) {
        ingredientsInfo[id] = { ...ingredient, count: 1 };
      } else {
        ingredientsInfo[id].count++;
      }
    });

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return { ...orderData, ingredientsInfo, date, total };
  }, [orderData, ingredients]);

  if (!orderInfo) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
