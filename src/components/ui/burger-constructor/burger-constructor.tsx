import React, { FC } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { TConstructorIngredient } from '../../../utils/types';
import { BurgerConstructorElementUI } from '../burger-constructor-element';
import { ModalUI } from '../modal';
import { Preloader, OrderDetailsUI } from '@ui';

type BurgerConstructorUIProps = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  price: number;
  orderRequest: boolean;
  orderModalData: { number: number } | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
  handleRemoveIngredient: (uuid: string) => void;
  handleMoveUp: (index: number) => void;
  handleMoveDown: (index: number) => void;
};

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems,
  price,
  orderRequest,
  orderModalData,
  onOrderClick,
  closeOrderModal,
  handleRemoveIngredient,
  handleMoveUp,
  handleMoveDown
}) => (
  <section
    className={styles.burger_constructor}
    data-cy='constructor-drop-area'
  >
    {/* Верхняя булка */}
    {constructorItems.bun ? (
      <div
        className={`${styles.element} mb-4 mr-4`}
        data-cy='constructor-bun-1'
      >
        <ConstructorElement
          type='top'
          isLocked
          text={`${constructorItems.bun.name} (верх)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      </div>
    ) : (
      <div
        className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}
      >
        Выберите булки
      </div>
    )}

    {/* Список ингредиентов */}
    <ul className={styles.elements}>
      {constructorItems.ingredients.length > 0 ? (
        constructorItems.ingredients.map((item, index) => (
          <div key={item.uuid} data-cy='constructor-filling'>
            <BurgerConstructorElementUI
              ingredient={item}
              index={index}
              totalItems={constructorItems.ingredients.length}
              handleMoveUp={() => handleMoveUp(index)}
              handleMoveDown={() => handleMoveDown(index)}
              handleClose={handleRemoveIngredient}
            />
          </div>
        ))
      ) : (
        <div
          className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}
        >
          Выберите начинку
        </div>
      )}
    </ul>

    {/* Нижняя булка */}
    {constructorItems.bun ? (
      <div
        className={`${styles.element} mt-4 mr-4`}
        data-cy='constructor-bun-2'
      >
        <ConstructorElement
          type='bottom'
          isLocked
          text={`${constructorItems.bun.name} (низ)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      </div>
    ) : (
      <div
        className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}
      >
        Выберите булки
      </div>
    )}

    {/* Сумма и кнопка */}
    <div className={`${styles.total} mt-10 mr-4`}>
      <div className={`${styles.cost} mr-10`}>
        <p className={`text ${styles.text} mr-2`}>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <Button
        htmlType='button'
        type='primary'
        size='large'
        onClick={onOrderClick}
        data-cy='order-button'
      >
        Оформить заказ
      </Button>
    </div>

    {/* Модалки */}
    {orderRequest && (
      <ModalUI onClose={closeOrderModal} title='Оформляем заказ...'>
        <Preloader />
      </ModalUI>
    )}

    {orderModalData && (
      <ModalUI
        onClose={closeOrderModal}
        title={orderRequest ? 'Оформляем заказ...' : ''}
      >
        <OrderDetailsUI orderNumber={orderModalData.number} />
      </ModalUI>
    )}
  </section>
);
