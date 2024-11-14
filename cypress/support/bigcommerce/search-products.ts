import { graphql } from '@bigcommerce/catalyst-core/client/graphql';
import { CatalystContext } from '../context';
import { ProductFragment } from './fragments/product';

const SearchProductsQuery = graphql(`
    query SearchProducts($filters: SearchProductsFiltersInput!) {
        site {
            search {
                searchProducts(filters: $filters) {
                    products {
                        edges {
                            node {
                                ...ProductFragment
                            }
                        }
                    }
                }
            }
        }
    }
`, [ProductFragment]);

Cypress.Commands.add('searchProducts', (filters: any, ctx?: CatalystContext) => {
    cy.getClient(ctx).then(async (client) => {
        const { data } = await client.fetch({
            document: SearchProductsQuery,
            variables: {
                filters
            }
        });

        return data.site.search.searchProducts.products.edges.map(({ node }) => node);
    });
});
