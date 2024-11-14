import { createClient } from '@bigcommerce/catalyst-client';
import { CatalystContext } from '../context';
import { defaultLocale } from '@bigcommerce/catalyst-core/i18n/routing';

const clients: Record<number, any> = {};

Cypress.Commands.add('getClient', (ctx?: CatalystContext) => {
    if (ctx === undefined) {
        ctx = {
            channelId: '1',
            locale: defaultLocale,
        };
    }

    if (!clients[ctx.channelId]) {
        clients[ctx.channelId] = createClient({
            storefrontToken: Cypress.env('BIGCOMMERCE_STOREFRONT_TOKEN') ?? '',
            xAuthToken: Cypress.env('BIGCOMMERCE_ACCESS_TOKEN') ?? '',
            storeHash: Cypress.env('BIGCOMMERCE_STORE_HASH') ?? '',
            channelId: ctx.channelId,
            backendUserAgentExtensions: 'cypress',
            logger: true,
        });
    }

    return clients[ctx.channelId];
});
