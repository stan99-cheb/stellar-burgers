beforeEach(() => {
  cy.visit('/');
  cy.viewport(1440, 800);
  cy.intercept('GET', '**/api/ingredients', {
    fixture: 'ingredients.json'
  }).as('getIngredients');
});

describe('Перехват запроса ингредиентов', () => {
  it('Должен получить моковые ингредиенты', () => {
    cy.get('@getIngredients')
      .its('response.body')
      .should('deep.equal', require('../fixtures/ingredients.json'));
  });

  it('Добавляет ингредиенты в конструктор по нажатию на кнопку "Добавить"', () => {
    cy.contains('Краторная булка N-200i')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('.constructor-element').should('contain', 'Краторная булка N-200i');

    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('.constructor-element').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
  });
});

describe('Перехват запроса ингредиентов', () => {
  it('Открывает модальное окно при клике на ингредиент', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('be.visible');
    cy.get('#modals').should('contain', 'Краторная булка N-200i');
  });

  it('Закрывает модальное окно при клике на крестик', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('be.visible');
    cy.get('#modals').should('contain', 'Краторная булка N-200i');

    cy.get('#modals').find('button[aria-label="Закрыть"]').click();

    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Закрывает модальное окно при клике на оверлей', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('be.visible');

    cy.get('#modals').find('[aria-label="overlay"]').click({ force: true });

    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Закрывает модальное окно по нажатию на кнопку Escape', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('be.visible');

    cy.get('body').type('{esc}');

    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.visit('/login');
    // В корневом каталоге проекта создайте файл cypress.env.json и добавьте туда данные для входа:
    // {
    //     "admin_user": "user@domain.com",
    //     "admin_password": "password123"
    // }
    cy.get('input[name="email"]').type(Cypress.env('admin_user'));
    cy.get('input[name="password"]').type(Cypress.env('admin_password'));
    cy.get('button[type="submit"]').click();
  });

  it('Создает заказ при нажатии на кнопку "Оформить заказ"', () => {
    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.contains('Флюоресцентная булка R2-D3')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    cy.contains('Мясо бессмертных моллюсков Protostomia')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('.constructor-element').should(
      'contain',
      'Флюоресцентная булка R2-D3'
    );
    cy.get('.constructor-element').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('.constructor-element').should(
      'contain',
      'Мясо бессмертных моллюсков Protostomia'
    );

    cy.contains('Оформить заказ').click();

    cy.wait('@createOrder').its('response.statusCode').should('eq', 200);
    cy.get('#modals').find('h2').contains('81234').should('be.visible');

    cy.get('#modals').find('button[aria-label="Закрыть"]').click();

    cy.get('.constructor-element').should('not.exist');
  });
});
