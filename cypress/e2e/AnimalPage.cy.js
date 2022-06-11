describe('Animal page', () => {
  before(() => {
    cy.visit('/animal');
    cy.injectAxe();
  });

  beforeEach(() => {});

  it('Add animal and name', () => {
    cy.visit('/animal');
    cy.get('[data-testid=displayAnimalType]').should('not.exist');
    cy.get('[data-testid=displayAnimalName]').should('not.exist');
    cy.get('#animalType').should('be.visible');
    cy.get('#animalName').should('not.exist');

    // Choose an animal type
    cy.get('#animalType').select('Dog');
    cy.get('[data-testid=displayAnimalType]').should('exist');
    cy.get('[data-testid=displayAnimalName]').should('not.exist');
    cy.get('#animalType').should('not.exist');
    cy.get('#animalName').should('be.visible');
    cy.contains('Type: Dog').should('be.visible');
    cy.url().should('eq', 'http://localhost:3000/animal/Dog');

    // Add a name
    cy.get('#animalName').type('Fido');
    cy.get('button').contains('Save name').click();

    cy.get('[data-testid=displayAnimalType]').should('exist');
    cy.get('[data-testid=displayAnimalName]').should('exist');
    cy.get('#animalType').should('not.exist');
    cy.get('#animalName').should('not.exist');
    cy.contains('Type: Dog').should('be.visible');
    cy.contains('Name: Fido').should('be.visible');
    cy.url().should('eq', 'http://localhost:3000/animal/Dog/name/Fido');
  });

  it('Shows correct content when going to /animal/fish route', () => {
    cy.visit('/animal/fish');
    cy.get('[data-testid=displayAnimalType]').should('exist');
    cy.get('[data-testid=displayAnimalName]').should('not.exist');
    cy.get('#animalType').should('not.exist');
    cy.get('#animalName').should('exist');
    cy.contains('Type: fish').should('be.visible');
  });

  it('Shows correct content when going to /animal/name/spot route', () => {
    cy.visit('/animal/bird/name/tweety');
    cy.get('[data-testid=displayAnimalType]').should('exist');
    cy.get('[data-testid=displayAnimalName]').should('exist');
    cy.get('#animalType').should('not.exist');
    cy.get('#animalName').should('not.exist');
    cy.contains('Type: bird').should('be.visible');
    cy.contains('Name: tweety').should('be.visible');
  });
});
