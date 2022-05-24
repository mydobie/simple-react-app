describe('Redirect page tests', () => {
  beforeEach(() => {
    cy.visit('/redirect');
  });
  it('Loads correctly', () => {
    cy.injectAxe();
    cy.checkA11y();
  });

  it(
    'Automatically redirects to homepage',
    {
      defaultCommandTimeout: 10000,
    },
    () => {
      cy.url().should('eq', 'http://localhost:3000/');
    }
  );

  it('Clicking button changes app to homepage', () => {
    cy.get('[data-testid=goToHomeButton]').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('Clicking link changes app to homepage', () => {
    cy.get('[data-testid=goToHomeLink]').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
