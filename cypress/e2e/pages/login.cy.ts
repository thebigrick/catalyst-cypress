describe('login page', () => {
    beforeEach(function () {
        cy.visit('/login/');
        cy.getTranslations('Login').as('translations');

        cy.get('#email').parents('form').as('loginForm');
        cy.get('@loginForm').find('button').as('loginButton');
    });

    it('should validate form', function () {
        cy.get('@loginButton').click();
        cy.get('@loginForm').contains(this.translations.Form.enterEmailMessage);
        cy.get('@loginForm').contains(this.translations.Form.entePasswordMessage);
    });
});
