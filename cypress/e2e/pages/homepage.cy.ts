describe('homepage', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.getTranslations('Home').as('translations');
    });

    it('header should be visible', function () {
        cy.get('header').should('be.visible');
    });

    context('home slider', function () {
        beforeEach(function () {
            cy.get('[aria-roledescription="carousel"]').eq(0).as('slider');
        });

        it('should be visible', function () {
            cy.get('@slider').should('be.visible');
        });

        it('should contain 3 slides', function () {
            cy.get('@slider').find('[aria-roledescription="slide"]').should('have.length', 3);
        });

        it('should scroll right by 1 slide', function () {
            cy.get('@slider').find('[aria-label="Next slide"]').click();
            cy.get('@slider').find('[aria-roledescription="slide"]').eq(1).should('be.visible');
        });

        it('should scroll left by 1 slide', function () {
            cy.get('@slider').find('[aria-label="Next slide"]').click();
            cy.wait(500);
            cy.get('@slider').find('[aria-label="Previous slide"]').click();
            cy.get('@slider').find('[aria-roledescription="slide"]').eq(0).should('be.visible');
        });
    });

    context('recent products', function () {
        beforeEach(function () {
            cy.get('[aria-roledescription=carousel]')
                .contains(this.translations.Carousel.newestProducts)
                .parents('[aria-roledescription=carousel]')
                .as('carousel');
        });

        it('should be visible', () => {
            cy.get('@carousel').should('be.visible');
        });

        it('should list all recent products', function () {
            cy.getRecentProducts().each((product: any) => {
                cy.get('@carousel')
                    .find(`a[href*="${product.path}"]`)
                    .should('have.length', 1);

                cy.get('@carousel')
                    .containsIgnoringEntities(product.name);
            });
        });

        it('should display 4 products in desktop the viewport', function () {
            cy.viewport(1920, 1080);
            cy.get('@carousel')
                .find('[aria-roledescription="slide"] > div:visible')
                .should('have.length', 4);
        });

        it('should display 4 products in mobile the viewport', function () {
            cy.viewport('iphone-x');
            cy.get('@carousel')
                .find('[aria-roledescription="slide"] > div:visible')
                .should('have.length', 4);
        });

        it('should scroll right by 4 products', function () {
            cy.get('@carousel')
                .find('[aria-label="Next products"]').click();

            cy.getRecentProducts().then((products: any) => {
                cy.wrap(products.slice(4, 8)).each((product: any) => {
                    cy.get('@carousel')
                        .find('[aria-roledescription="slide"] > div:visible')
                        .find(`a[href*="${product.path}"]`)
                        .should('exist');
                });
            });
        });

        it('should scroll left by 4 products', function () {
            cy.get('@carousel').find('[aria-label="Next products"]').click();
            cy.wait(500);
            cy.get('@carousel').find('[aria-label="Previous products"]').click();

            cy.getRecentProducts().then((products: any) => {
                cy.wrap(products.slice(0, 4)).each((product: any) => {
                    cy.get('@carousel')
                        .find('[aria-roledescription="slide"] > div:visible')
                        .find(`a[href*="${product.path}"]`)
                        .should('exist');
                });
            });
        });

        it('should navigate the carousel with the tab keys', function () {
            cy.get('@carousel').find('[aria-label="Slides"] button').eq(2).click();

            cy.getRecentProducts().then((products: any) => {
                cy.wrap(products.slice(8, 12)).each((product: any) => {
                    cy.get('@carousel')
                        .find('[aria-roledescription="slide"] > div:visible')
                        .find(`a[href*="${product.path}"]`)
                        .should('exist');
                });
            });
        });
    });
});
