import { SELECTORS } from 'cypress/support/constants';

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
    cy.addIngredient('Краторная булка N-200i');
    cy.addIngredient('Биокотлета из марсианской Магнолии');

    cy.shouldBeIngredientInConstructor(
      SELECTORS.CONSTRUCTOR_ELEMENT,
      'Краторная булка N-200i'
    );
    cy.shouldBeIngredientInConstructor(
      SELECTORS.CONSTRUCTOR_ELEMENT,
      'Биокотлета из марсианской Магнолии'
    );
  });
});

describe('Перехват запроса ингредиентов', () => {
  it('Открывает модальное окно при клике на ингредиент', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains(SELECTORS.INGREDIENTS_DETAILS).should('be.visible');
    cy.get(SELECTORS.MODAL).should('contain', 'Краторная булка N-200i');
  });

  it('Закрывает модальное окно при клике на крестик', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains(SELECTORS.INGREDIENTS_DETAILS).should('be.visible');
    cy.get(SELECTORS.MODAL).should('contain', 'Краторная булка N-200i');

    cy.get(SELECTORS.MODAL).find('button[aria-label="Закрыть"]').click();

    cy.contains(SELECTORS.INGREDIENTS_DETAILS).should('not.exist');
  });

  it('Закрывает модальное окно при клике на оверлей', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains(SELECTORS.INGREDIENTS_DETAILS).should('be.visible');

    cy.get(SELECTORS.MODAL)
      .find(SELECTORS.MODAL_OVERLAY)
      .click({ force: true });

    cy.contains(SELECTORS.INGREDIENTS_DETAILS).should('not.exist');
  });

  it('Закрывает модальное окно по нажатию на кнопку Escape', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains(SELECTORS.INGREDIENTS_DETAILS).should('be.visible');

    cy.get('body').type('{esc}');

    cy.contains(SELECTORS.INGREDIENTS_DETAILS).should('not.exist');
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

    cy.addIngredient('Флюоресцентная булка R2-D3');
    cy.addIngredient('Биокотлета из марсианской Магнолии');
    cy.addIngredient('Мясо бессмертных моллюсков Protostomia');

    cy.shouldBeIngredientInConstructor(
      SELECTORS.CONSTRUCTOR_ELEMENT,
      'Флюоресцентная булка R2-D3'
    );
    cy.shouldBeIngredientInConstructor(
      SELECTORS.CONSTRUCTOR_ELEMENT,
      'Биокотлета из марсианской Магнолии'
    );
    cy.shouldBeIngredientInConstructor(
      SELECTORS.CONSTRUCTOR_ELEMENT,
      'Мясо бессмертных моллюсков Protostomia'
    );

    cy.contains('Оформить заказ').click();

    cy.wait('@createOrder').its('response.statusCode').should('eq', 200);
    cy.get(SELECTORS.MODAL).find('h2').contains('81234').should('be.visible');

    cy.get(SELECTORS.MODAL).find('button[aria-label="Закрыть"]').click();

    cy.get(SELECTORS.CONSTRUCTOR_ELEMENT).should('not.exist');
  });
});
