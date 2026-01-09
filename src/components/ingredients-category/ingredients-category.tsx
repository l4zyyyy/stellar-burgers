import { forwardRef, useMemo } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { TIngredientsCategoryProps } from './type';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const { bun, ingredients: constructorIngredients } = useAppSelector(
    (state) => state.burgerconstructor
  );

  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};

    if (!constructorIngredients) return counters;

    constructorIngredients.forEach((ingredient) => {
      counters[ingredient._id] = (counters[ingredient._id] || 0) + 1;
    });

    if (bun) {
      counters[bun._id] = 2;
    }

    return counters;
  }, [constructorIngredients, bun]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
