Cypress.Commands.add('normalizePath', (path: string) => {
    cy.getCtx(path).then((ctx) => {
        if (ctx.channelId === '1') {
            return path.replace(`/${ctx.locale}/`, '/');
        }

        return path;
    });
});
