declare namespace Cypress {
    interface Chainable<Subject = any> {
        getRecentProducts(ctx?: any): Chainable;
        getNavCategories(ctx?: any): Chainable;
        getClient(ctx?: any): Chainable;
        getCategoryByPath(path: string, ctx?: any): Chainable;
        searchProducts(filters: any, ctx?: any): Chainable;
        getBrands(ctx?: any): Chainable;
        getCtx(path?: string): Chainable;

        getTranslations(key: string): Chainable;
        checkIsNot404(): Chainable;
        normalizePath(path: string): Chainable<string>;
        dragHorizontal(pixel: number): Chainable;
        containsIgnoringEntities(text: string): Chainable;
    }
}
