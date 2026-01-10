describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/orders', {
      fixture: 'order.json'
    }).as('postOrder');

    cy.setCookie('accessToken', 'test-access-token');
    localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('должен добавить ингредиенты в конструктор', () => {
    cy.get('[data-cy=bun-ingredient]')
      .first()
      .closest('li')
      .contains('Добавить')
      .click();

    cy.get('[data-cy=main-ingredient]')
      .first()
      .closest('li')
      .contains('Добавить')
      .click();

    cy.get('[data-cy=constructor-bun-1]').should('exist');
    cy.get('[data-cy=constructor-bun-2]').should('exist');
    cy.get('[data-cy=constructor-filling]').should('exist');
  });

  it('должен оформить заказ и закрыть модалку', () => {
  cy.get('[data-cy=bun-ingredient]')
    .first()
    .closest('li')
    .contains('Добавить')
    .click();

  cy.get('[data-cy=main-ingredient]')
    .first()
    .closest('li')
    .contains('Добавить')
    .click();

  cy.get('[data-cy=order-button]').click();
  cy.wait('@postOrder');

  cy.contains('66666').should('exist');

  cy.get('[data-cy=modal-close]').click();
  cy.get('[data-cy=modal]').should('not.exist');
});


  it('должен закрывать модалку ингредиента по Esc', () => {
  cy.get('[data-cy=bun-ingredient]').first().click();

  cy.get('[data-cy=modal]').should('exist');

  cy.get('body').type('{esc}');
  cy.get('[data-cy=modal]').should('not.exist');
});

});
