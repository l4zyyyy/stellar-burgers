import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';

describe('Тесты редьюсера ingredientsSlice', () => {
  const initialState = {
    items: [],
    isLoading: false,
    error: null
  };

  it('должен менять isLoading на true при экшене fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен записывать ингредиенты и isLoading: false при fetchIngredients.fulfilled', () => {
    const mockIngredients = [{ _id: '1', name: 'Ингредиент' }];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
  });

  it('должен записывать ошибку и isLoading: false при fetchIngredients.rejected', () => {
    const action = { type: fetchIngredients.rejected.type };
    const state = ingredientsReducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ингредиентов');
  });
});
