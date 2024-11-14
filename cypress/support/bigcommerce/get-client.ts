import { createClient } from '@bigcommerce/catalyst-client';

const clients: Record<number, any> = {};

const getClient = async (channelId: number = 1) => {
    if (!clients[channelId]) {
        clients[channelId] = createClient({
            storefrontToken: Cypress.env('BIGCOMMERCE_STOREFRONT_TOKEN') ?? '',
            xAuthToken: Cypress.env('BIGCOMMERCE_ACCESS_TOKEN') ?? '',
            storeHash: Cypress.env('BIGCOMMERCE_STORE_HASH') ?? '',
            channelId: channelId.toString(),
            backendUserAgentExtensions: 'cypress',
            logger: true,
        });
    }

    return clients[channelId];
};

export default getClient;
