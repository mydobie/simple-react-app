const checkActiveTulip = () => {
  cy.get('[data-testid="pagecontent"]').should('be.visible');
  cy.get('[data-testid="tulipimage"]').should('be.visible');
  cy.get('[data-testid="daisiesimage"]').should('not.exist');

  cy.get('.nav-link').contains('Tulip').should('have.class', 'active');
  cy.get('.nav-link').contains('Daisies').should('not.have.class', 'active');
};

const checkActiveDaisies = () => {
  cy.get('[data-testid="pagecontent"]').should('be.visible');
  cy.get('[data-testid="tulipimage"]').should('not.exist');
  cy.get('[data-testid="daisiesimage"]').should('be.visible');

  cy.get('.nav-link').contains('Daisies').should('have.class', 'active');
  cy.get('.nav-link').contains('Tulip').should('not.have.class', 'active');
};

describe('Flowers page', () => {
  before(() => {
    cy.visit('/flowers');
    cy.injectAxe();
  });

  beforeEach(() => {});

  it('Correct content on /flowers route', () => {
    checkActiveTulip();
    cy.checkA11y();
  });

  it('Correct content when click on tabs', () => {
    // Click on Daises tab
    cy.get('.nav-link').contains('Daisies').click();
    cy.url().should('eq', 'http://localhost:3000/flowers/daisies');
    checkActiveDaisies();
    cy.checkA11y();

    // Click on Tulip tab
    cy.get('.nav-link').contains('Tulip').click();
    cy.url().should('eq', 'http://localhost:3000/flowers/tulips');
    checkActiveTulip();
  });

  it('Correct content on /flowers/tulip route', () => {
    cy.visit('/flowers/tulips');
    checkActiveTulip();
  });
  it('Correct content on /flowers/daisy route', () => {
    cy.visit('/flowers/daisies');
    checkActiveDaisies();
  });
});
