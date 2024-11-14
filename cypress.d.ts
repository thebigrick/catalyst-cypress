declare namespace Cypress {
    interface Chainable {
        getRecentProducts(): Chainable<any[]>;
        containsIgnoringEntities(text: string): Chainable<any>;
    }
}
