import constructorReducer, {
  addIngredient,
  removeIngredient,
  resetConstructor
} from './constructorSlice';

describe('Тесты редьюсера constructorSlice', () => {
  const mockIngredient = {
    _id: '1',
    name: 'Начинка',
    type: 'main',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    price: 100,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  const mockBun = { ...mockIngredient, _id: '2', name: 'Булка', type: 'bun' };

  it('должен обрабатывать добавление булки', () => {
    const state = constructorReducer(undefined, addIngredient(mockBun));
    expect(state.bun).toEqual(
      expect.objectContaining({ _id: '2', type: 'bun' })
    );
    expect(state.bun?.uuid).toBeDefined(); // Проверяем работу nanoid в prepare
  });

  it('должен обрабатывать добавление ингредиента (начинки)', () => {
    const state = constructorReducer(undefined, addIngredient(mockIngredient));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].name).toBe('Начинка');
    expect(state.ingredients[0].uuid).toBeDefined();
  });

  it('должен обрабатывать удаление ингредиента', () => {
    // Сначала создаем состояние с одним ингредиентом
    const initialState = {
      bun: null,
      ingredients: [{ ...mockIngredient, uuid: 'test-uuid' }]
    };
    const state = constructorReducer(
      initialState,
      removeIngredient('test-uuid')
    );
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен очищать конструктор (resetConstructor)', () => {
    const dirtyState = {
      bun: { ...mockBun, uuid: '1' },
      ingredients: [{ ...mockIngredient, uuid: '2' }]
    };
    const state = constructorReducer(dirtyState, resetConstructor());
    expect(state).toEqual({ bun: null, ingredients: [] });
  });
});
