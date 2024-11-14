// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import getRecentProducts from './bigcommerce/get-recent-products';

Cypress.Commands.add('getRecentProducts', () => {
    return cy.wrap(null).then(async () => {
        return await getRecentProducts();
    });
});

Cypress.Commands.add(
    'containsIgnoringEntities',
    { prevSubject: 'optional' },
    (subject, text) => {
        const decodeHTMLEntities = (html) => {
            const txt = document.createElement('textarea');
            txt.innerHTML = html;
            return txt.value;
        };

        const checkText = ($el) => {
            const html = $el.html();
            const decodedText = decodeHTMLEntities(html);
            expect(decodedText).to.include(text);
        };

        if (subject) {
            cy.wrap(subject).then(($el) => {
                checkText($el);
            });
        } else {
            cy.get('body').then(($el) => {
                checkText($el);
            });
        }
    }
);
