import { FC } from 'react';
import { ConstructorElement } from '@zlden/react-developer-burger-ui-components';
import { TConstructorIngredient } from '@utils-types';

type BurgerConstructorElementProps = {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
};

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = ({
  ingredient
}) => (
  <li>
    <ConstructorElement
      text={ingredient.name}
      price={ingredient.price}
      thumbnail={ingredient.image}
    />
  </li>
);
