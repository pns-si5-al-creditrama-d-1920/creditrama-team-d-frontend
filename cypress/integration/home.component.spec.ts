describe('Firestarter', () => {

  it('has a heading', () => {
    cy.visit('/');
    cy.contains('Welcome to Firestarter');
    // or...
    cy.get('h1').should('contain', 'Welcome to Firestarter');
  });
});
