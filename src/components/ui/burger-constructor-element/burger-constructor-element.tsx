import React, { FC, memo } from 'react';
import styles from './burger-constructor-element.module.css';
import {
  ConstructorElement,
  MoveButton
} from '@zlden/react-developer-burger-ui-components';
import { TConstructorIngredient } from '../../../utils/types';

export type BurgerConstructorElementUIProps = {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  handleClose: (uuid: string) => void;
};

export const BurgerConstructorElementUI: FC<BurgerConstructorElementUIProps> =
  memo(
    ({
      ingredient,
      index,
      totalItems,
      handleMoveUp,
      handleMoveDown,
      handleClose
    }) => (
      <li className={`${styles.element} mb-4 mr-2`}>
        <MoveButton
          handleMoveDown={handleMoveDown}
          handleMoveUp={handleMoveUp}
          isUpDisabled={index === 0}
          isDownDisabled={index === totalItems - 1}
        />
        <div className={`${styles.element_fullwidth} ml-2`}>
          <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={() => handleClose(ingredient.uuid)}
          />
        </div>
      </li>
    )
  );
