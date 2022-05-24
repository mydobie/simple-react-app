describe('Sample Test', () => {
  before(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  beforeEach(() => {});

  it('Is accessible', () => {
    cy.checkA11y();
  });
});
