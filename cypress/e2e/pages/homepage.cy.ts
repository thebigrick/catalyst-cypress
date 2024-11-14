describe('homepage', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('header should be visible', () => {
        cy.get('header').should('be.visible');
    });

    it('slider should be visible', () => {
        cy.get('#slideshow-slides').should('be.visible');
    });

    it('highlight products should be visible', () => {
        // The first carousel is the slider. The second carousel is the highlight products.
        cy.get('[aria-roledescription=carousel]').eq(1).should('be.visible');
    });

    it('should list all recent products', () => {
        cy.getRecentProducts().then((products) => {
            products.forEach((product) => {
                cy.get('[aria-roledescription=carousel]')
                    .eq(1)
                    .contains('a', product.href);

                cy.get('[aria-roledescription=carousel]')
                    .eq(1)
                    .containsIgnoringEntities(product.name);
            });
        });
    });
});
