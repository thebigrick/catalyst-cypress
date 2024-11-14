import { graphql } from '@bigcommerce/catalyst-core/client/graphql';
import { CatalystContext } from '../context';
import { ProductFragment } from './fragments/product';

const NewestProductsQuery = graphql(`
    query NewestProducts {
        site {
            newestProducts {
                edges {
                    node {
                        ...ProductFragment
                    }
                }
            }
        }
    }
`, [ProductFragment]);

Cypress.Commands.add('getRecentProducts', (ctx?: CatalystContext) => {
    cy.getClient(ctx).then(async (client) => {
        const { data } = await client.fetch({
            document: NewestProductsQuery,
        });

        return data.site.newestProducts.edges.map(({ node }) => node);
    });
});
