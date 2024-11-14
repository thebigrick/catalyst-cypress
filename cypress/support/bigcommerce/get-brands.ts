import { graphql } from '@bigcommerce/catalyst-core/client/graphql';
import { CatalystContext } from '../context';

const BrandsQuery = graphql(`
    query Brands {
        site {
            brands {
                edges {
                    node {
                        entityId
                        name
                        path
                    }
                }
            }
        }
    }
`);

Cypress.Commands.add('getBrands', (ctx?: CatalystContext) => {
    cy.getClient(ctx).then(async (client) => {
        const { data } = await client.fetch({
            document: BrandsQuery,
        });

        return data.site.brands.edges.map(({ node }) => node);
    });
});
