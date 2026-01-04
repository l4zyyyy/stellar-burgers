import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { BurgerConstructorUI } from '@ui';
import {
  resetConstructor,
  removeIngredient
} from '../../services/slices/constructorSlice';
import { placeOrder, clearOrder } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { bun, ingredients } = useAppSelector(
    (state) => state.burgerconstructor
  );
  const { orderData, orderRequest } = useAppSelector((state) => state.order);
  const isAuth = useAppSelector((state) => state.auth.isLoggedIn);

  const handleRemoveIngredient = (uuid: string) => {
    dispatch(removeIngredient(uuid));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newIngredients = [...ingredients];
    [newIngredients[index - 1], newIngredients[index]] = [
      newIngredients[index],
      newIngredients[index - 1]
    ];
  };

  const handleMoveDown = (index: number) => {
    if (index === ingredients.length - 1) return;
    const newIngredients = [...ingredients];
    [newIngredients[index], newIngredients[index + 1]] = [
      newIngredients[index + 1],
      newIngredients[index]
    ];
    // TODO: диспатч обновления ингредиентов
  };

  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login');
      return;
    }
    if (!bun || orderRequest) return;

    const orderIds = [bun._id, ...ingredients.map((ing) => ing._id), bun._id];
    dispatch(placeOrder(orderIds)).then(() => {
      dispatch(resetConstructor());
    });
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((sum, ing) => sum + ing.price, 0),
    [bun, ingredients]
  );

  const constructorItems = { bun, ingredients };

  return (
    <BurgerConstructorUI
      constructorItems={constructorItems}
      price={price}
      orderRequest={orderRequest}
      orderModalData={orderData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      handleRemoveIngredient={handleRemoveIngredient}
      handleMoveUp={handleMoveUp}
      handleMoveDown={handleMoveDown}
    />
  );
};
