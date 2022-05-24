describe('Color page', () => {
  before(() => {
    cy.visit('/color');
    cy.injectAxe();
  });

  beforeEach(() => {
    // EXAMPLE: Cypress - Reload page
    // cy.reload(); // reloads the page
    cy.get('#myColor').as('colorInput');
    cy.contains('Go to homepage').as('homeButton');
    cy.contains('Please enter a primary or secondary color').as('errorMessage');
    cy.contains('Looks good!').as('successMessage');

    cy.get('@colorInput').clear();
    cy.get('@colorInput').should('have.value', '');
    cy.get('@homeButton').should('be.disabled');
  });

  it('Empty value', () => {
    cy.get('@homeButton').should('be.disabled');
    cy.get('@colorInput').should('not.have.attr', 'aria-invalid');
    cy.get('@errorMessage').should('not.be.visible');
    cy.get('@successMessage').should('not.be.visible');
    cy.checkA11y();
  });

  it('Enter a bad color', () => {
    ['maroon', 'asd'].forEach((color) => {
      // EXAMPLE: Cypress - type into an input
      cy.get('@colorInput').clear().type(color);
      cy.get('@colorInput').should('have.value', color);
      cy.get('@colorInput').should('have.attr', 'aria-invalid', 'true');
      cy.get('@errorMessage').should('be.visible');
      cy.get('@successMessage').should('not.be.visible');
      cy.get('@homeButton').should('be.disabled');
    });
    cy.checkA11y();
  });

  it('Enter a bad color and empty value', () => {
    cy.get('@colorInput').type('maroon');
    cy.get('@colorInput').should('have.value', 'maroon');
    cy.get('@colorInput').clear();
    cy.get('@colorInput').should('have.value', '');
    cy.get('@homeButton').should('be.disabled');
    cy.get('@colorInput').should('not.have.attr', 'aria-invalid');
    cy.get('@errorMessage').should('not.be.visible');
    cy.get('@successMessage').should('not.be.visible');
  });

  it('Enter a good color', () => {
    [
      'red',
      'Red',
      'RED',
      'orange',
      'yellow',
      'green',
      'blue',
      'violet',
    ].forEach((color) => {
      cy.get('#myColor').clear().type(color);
      cy.get('#myColor').should('have.value', color);
      cy.get('#myColor').should('have.attr', 'aria-invalid', 'false');
      cy.get('@errorMessage').should('not.be.visible');
      cy.get('@successMessage').should('be.visible');
      cy.get('@homeButton').should('not.be.disabled');
    });

    cy.checkA11y();
  });

  it('Enter a good color', () => {
    cy.get('#myColor').type('red');
    cy.get('#myColor').should('have.value', 'red');
    cy.get('#myColor').clear();
    cy.get('#myColor').should('have.value', '');
    cy.get('@homeButton').should('be.disabled');
    cy.get('#myColor').should('not.have.attr', 'aria-invalid');
    cy.get('@errorMessage').should('not.be.visible');
    cy.get('@successMessage').should('not.be.visible');
  });

  it('Entering color in URL is set in the input box', () => {
    // returning false here prevents Cypress from
    // failing the test
    // Cypress.on('uncaught:exception', (/* err, runnable */) => false);
    cy.visit('/color/red');
    cy.get('#myColor').should('have.value', 'red');
    cy.get('#myColor').clear();
    cy.get('#myColor').should('have.value', '');
    cy.get('@homeButton').should('be.disabled');
    cy.get('#myColor').should('not.have.attr', 'aria-invalid');
    cy.get('@errorMessage').should('not.be.visible');
    cy.get('@successMessage').should('not.be.visible');
  });

  it('Go to homepage goes to homepage', () => {
    cy.get('#myColor').type('red');
    cy.get('@homeButton').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
