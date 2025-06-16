declare namespace Cypress {
  interface Chainable {
    addIngredient(selector: string): Chainable<void>;
    shouldBeIngredientInConstructor(
      selector: string,
      ingredient: string
    ): Chainable<void>;
  }
}
