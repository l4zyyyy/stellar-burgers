import { rootReducer } from './rootReducer';

describe('Проверка rootReducer', () => {
  it('должен возвращать начальное состояние при передаче undefined и неизвестного экшена', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      ingredients: { items: [], isLoading: false, error: null },
      burgerconstructor: { bun: null, ingredients: [] },
      feed: { orders: [], total: 0, totalToday: 0, connected: false },
      profileOrders: { orders: [], connected: false },
      auth: { user: null, isLoggedIn: false, isAuthChecked: false },
      order: { orderData: null, orderRequest: false }
    });
  });
});
