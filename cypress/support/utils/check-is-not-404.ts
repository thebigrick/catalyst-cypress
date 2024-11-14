Cypress.Commands.add('checkIsNot404', () => {
    cy.getTranslations('NotFound').then((translations) => {
        cy.contains(translations.heading).should('not.exist');
    });
});
