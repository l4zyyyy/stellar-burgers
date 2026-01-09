describe('Конструктор бургера', () => {
  const testUrl = 'http://localhost:4000';

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder');

    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.setCookie('accessToken', 'test-access-token');

    cy.visit(testUrl);

    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('должен добавить ингредиенты в конструктор', () => {
    const bunSelector = '[data-cy=bun-ingredients] button:first';
    const mainSelector = '[data-cy=mains-ingredients] button:first';

    // --- ТЕСТ МОДАЛКИ ИНГРЕДИЕНТА ---
    cy.get('[data-cy=bun-ingredient]').first().click();
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modal] h3').contains('Краторная булка N-200i');
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    // --- ТЕСТ DRAG-AND-DROP ---
    const dataTransfer = new DataTransfer();

    cy.get('[data-cy=bun-ingredient]').first().trigger('dragstart', {
      dataTransfer
    });
    cy.get('[data-cy=constructor-drop-area]').trigger('drop', {
      dataTransfer
    });

    cy.get('[data-cy=main-ingredient]').first().trigger('dragstart', {
      dataTransfer
    });
    cy.get('[data-cy=constructor-drop-area]').trigger('drop', {
      dataTransfer
    });

    cy.get('[data-cy=constructor-bun-1]').contains('Краторная булка N-200i (верх)').should('exist');
    cy.get('[data-cy=constructor-bun-2]').contains('Краторная булка N-200i (низ)').should('exist');
    cy.get('[data-cy=constructor-filling]').contains('Биокотлета из марсианской Магнолии').should('exist');
  });

  it('должен оформить заказ и закрыть модалку', () => {
    const dataTransfer = new DataTransfer();

    cy.get('[data-cy=bun-ingredient]').first().trigger('dragstart', { dataTransfer });
    cy.get('[data-cy=constructor-drop-area]').trigger('drop', { dataTransfer });

    cy.get('[data-cy=main-ingredient]').first().trigger('dragstart', { dataTransfer });
    cy.get('[data-cy=constructor-drop-area]').trigger('drop', { dataTransfer });

    cy.get('[data-cy=order-button]').click();

    cy.wait('@postOrder');
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=order-number]').contains('66666');

    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=constructor-bun-1]').should('not.exist');
    cy.get('[data-cy=constructor-filling]').should('not.exist');
  });
});