import { graphql } from '@bigcommerce/catalyst-core/client/graphql';
import { CatalystContext } from '../context';

const CategoryTreeQuery = graphql(`
    query CategoryTree {
        site {
            categoryTree {
                entityId
                name
                path
            }
        }
    }
`);

Cypress.Commands.add('getNavCategories', (ctx?: CatalystContext) => {
    cy.getClient(ctx).then(async (client) => {
        const { data } = await client.fetch({
            document: CategoryTreeQuery,
        });

        return data.site.categoryTree;
    });
});
