import { graphql } from '@bigcommerce/catalyst-core/client/graphql';
import { CatalystContext } from '../context';

const CategoryByPathQuery = graphql(`
    query CategoryByPath($path: String!) {
        site {
            route(path: $path) {
                node {
                    ...on Category {
                        entityId
                        name
                        breadcrumbs(depth:3) {
                            edges {
                                node {
                                    name
                                    path
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`);

Cypress.Commands.add('getCategoryByPath', (path: string, ctx?: CatalystContext) => {
    cy.getClient(ctx).then(async (client) => {
        const { data } = await client.fetch({
            document: CategoryByPathQuery,
            variables: {
                path
            }
        });

        return data.site.route.node;
    });
});
