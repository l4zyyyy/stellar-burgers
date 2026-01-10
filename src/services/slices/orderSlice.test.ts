import orderReducer, { clearOrder, placeOrder } from './orderSlice';

describe('Тесты редьюсера orderSlice', () => {
  const initialState = {
    orderData: null,
    orderRequest: false
  };

  it('должен очищать данные заказа (clearOrder)', () => {
    const stateWithData = {
      orderData: {
        _id: '1',
        number: 123,
        status: 'done',
        name: 'Бургер',
        createdAt: '',
        updatedAt: '',
        ingredients: []
      },
      orderRequest: false
    };
    const state = orderReducer(stateWithData, clearOrder());
    expect(state.orderData).toBeNull();
  });

  it('должен устанавливать orderRequest: true при placeOrder.pending', () => {
    const action = { type: placeOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(true);
  });

  it('должен сохранять данные заказа при placeOrder.fulfilled', () => {
    const mockOrder = { number: 777, name: 'Мега Бургер' };
    const action = {
      type: placeOrder.fulfilled.type,
      payload: mockOrder
    };
    const state = orderReducer({ ...initialState, orderRequest: true }, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderData).toEqual(mockOrder);
  });

  it('должен сбрасывать orderRequest при placeOrder.rejected', () => {
    const action = { type: placeOrder.rejected.type };
    const state = orderReducer({ ...initialState, orderRequest: true }, action);
    expect(state.orderRequest).toBe(false);
  });
});
