
Cypress.Commands.add('containsIgnoringEntities', { prevSubject: 'optional' }, (subject, text) => {
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
});