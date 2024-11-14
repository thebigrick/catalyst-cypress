describe('searchbar', function () {
    beforeEach(function () {
        cy.visit('/');

        cy.get('[aria-label="Open search popup"]').as('searchButton');
    });

    it('should be closed at page load', function () {
        cy.get('[role="dialog"]').should('not.exist');
    });

    context('search popup', function () {
        beforeEach(function () {
            cy.get('@searchButton').click();
            cy.get('[role="dialog"]').as('searchPopup');
            cy.get('[aria-label="Close search popup"]').as('closeButton');
            cy.get('@searchButton').get('input').as('searchInput');
        });

        it('should be visible', function () {
            cy.get('[role="dialog"]').should('be.visible');
        });

        it('should close the search popup', function () {
            cy.get('@closeButton').click();
            cy.get('[role="dialog"]').should('not.exist');
        });

        it('should show clear button when input is not empty', function () {
            cy.get('[aria-label="Clear search"]').should('not.exist');
            cy.get('@searchInput').type('a');
            cy.get('[aria-label="Clear search"]').should('exist');
        });

        it('should clear the input when clear button is clicked', function () {
            cy.get('@searchInput').type('a');
            cy.get('[aria-label="Clear search"]').click();
            cy.get('@searchInput').should('have.value', '');
        });

        it('should start searching only after 3 characters', function () {
            cy.get('@searchInput').type('a');
            cy.get('@searchPopup').contains('Processing...').should('not.exist');

            cy.get('@searchInput').type('b');
            cy.get('@searchPopup').contains('Processing...').should('not.exist');

            cy.get('@searchInput').type('c');
            cy.get('@searchPopup').contains('Processing...').should('exist');
        });

        it('should search products', function () {
            cy.getRecentProducts().then((products) => {
                cy.get('@searchInput').type(products[0].name);
                cy.get('@searchPopup').get('#products').contains(products[0].name);
                cy.get('@searchPopup').get('#products').get(`a[href*="${products[0].path}"]`).should('exist');
            });
        });

        it('should display all the categories of a product', function () {
            // TODO: Refactor to avoid fetching an empty category
            cy.getNavCategories().then((categories) => {
                cy.getCategoryByPath(categories[0].path).then((category) => {
                    cy.searchProducts({ categoryEntityId: category.entityId }).then((products) => {
                        cy.get('@searchInput').type(products[0].name);

                        cy.wrap(products[0].categories.edges).each((edge: any) => {
                            const category = edge.node;

                            cy.get('@searchPopup').get('#categories').contains(category.name);
                            cy.get('@searchPopup').get('#categories').get(`a[href*="${category.path}"]`).should('exist');
                        });
                    });
                });
            });
        });

        it('should display all the brands of a product', function () {
            // TODO: Refactor to avoid fetching an empty brand
            cy.getBrands().then((brands) => {
                console.log(brands);
                cy.searchProducts({ brandEntityIds: brands[0].entityId }).then((products) => {
                    cy.get('@searchInput').type(products[0].name);

                    cy.get('@searchPopup').get('#brands').contains(products[0].brand.name);
                    cy.get('@searchPopup').get('#brands').get(`a[href*="${products[0].brand.path}"]`).should('exist');
                });
            });
        });

        it('should display empty results', function () {
            // TODO: Catalyst is missing a correct translation for this message. This may fail in the future.
            cy.get('@searchInput').type('thisproductdoesnotexist');
            cy.get('@searchPopup').contains('No products matched with');
            cy.get('@searchPopup').contains('thisproductdoesnotexist');
        });

        it('should open search page when enter is pressed', function () {
            cy.get('@searchInput').type('some random product{enter}');
            cy.url().should('include', '/search/?term=some%20random%20product');
        });
    });
});
