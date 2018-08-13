describe('Page Exists', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has page title', () => {
    cy.get('[data-cy=title]')
    .should('contain', 'Quasar');
  });

});
