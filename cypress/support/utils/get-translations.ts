Cypress.Commands.add('getTranslations', (key: string) => {
    cy.getCtx().then((ctx) => {
        const {locale} = ctx;

        cy.wrap(null).then(async () => {
            const messages = await import(`@bigcommerce/catalyst-core/messages/${locale}.json`, { assert: { type: "json" } });
            return messages?.[key];
        });
    });
});