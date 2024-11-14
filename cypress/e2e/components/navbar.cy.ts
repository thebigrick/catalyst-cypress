describe('navbar', function () {
    beforeEach(function () {
        cy.visit('/');

        cy.get('button[aria-label="Toggle navigation"]').as('toggleButton');
    });

    context('mobile mode', function () {
        beforeEach(function () {
            cy.viewport('iphone-x');
            cy.get('@toggleButton').click();

            cy.get('div[role="dialog"] button').first().as('closeButton');
            cy.get('nav[aria-label="Main"]').filter(':visible').first().as('navbar');
        });

        it('all the links in the navbar should be browsable', function () {
            cy.get('@navbar')
                .find('a[href^="/"]')
                .then((links) => {
                    const hrefs = links.map((index, element) => Cypress.$(element).attr('href')).get();

                    cy.wrap(hrefs)
                        .should('have.length.greaterThan', 0)
                        .then((hrefs) => {
                            for (const href of hrefs) {
                                cy.get('@navbar').find(`a[href*="${href}"]`).first().click();

                                cy.normalizePath(href).then((destinationPath) => {
                                    cy.url().should('contain', destinationPath);
                                });

                                cy.checkIsNot404();
                                cy.go('back');
                                cy.get('@toggleButton').click();
                            }
                        });
                });

            cy.get('@closeButton').click();
        });
    });

    context('desktop mode', function () {
        beforeEach(function () {
            cy.viewport(1920, 1080);
            cy.get('nav[aria-label="Main"]').filter(':visible').first().as('navbar');
        });

        it('navbar should be visible', function () {
            cy.get('@navbar').should('exist');
        });

        it('navbar should contain all the categories', function () {
            cy.getNavCategories().each((category: any) => {
                cy.get('@navbar').containsIgnoringEntities(category.name);
                cy.get('@navbar').contains('a', category.href);
            });
        });

        it('all the links in the navbar should be browsable', function () {
            cy.get('@navbar')
                .find('a[href^="/"]')
                .then((links) => {
                    const hrefs = links.map((index, element) => Cypress.$(element).attr('href')).get();

                    cy.wrap(hrefs)
                        .should('have.length.greaterThan', 0)
                        .then((hrefs) => {
                            for (const href of hrefs) {
                                cy.get('@navbar').find(`a[href="${href}"]`).first().click();

                                cy.normalizePath(href).then((destinationPath) => {
                                    cy.url().should('contain', destinationPath);
                                });

                                cy.checkIsNot404();
                                cy.go('back');
                            }
                        });
                });
        });
    });
});
