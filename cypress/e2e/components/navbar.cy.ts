describe('homepage', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('header should be visible', () => {
        cy.get('nav').should('be.visible');
    });
});
