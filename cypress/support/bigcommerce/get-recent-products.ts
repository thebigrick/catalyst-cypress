import getClient from './get-client';
import { graphql } from './graphql';

const NewestProductsQuery = graphql(`
    query NewestProductsQuery {
        site {
            newestProducts {
                edges {
                    node {
                        sku
                        name
                        path
                    }
                }
            }
        }
    }
`);

const getRecentProducts = async () => {
    const client = await getClient();

    const { data } = await client.fetch({
        document: NewestProductsQuery,
    });

    return data.site.newestProducts.edges.map(({ node }) => node);
};

export default getRecentProducts;
