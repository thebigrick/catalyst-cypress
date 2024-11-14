import { getChannelIdFromLocale } from '@bigcommerce/catalyst-core/channels.config';
import { defaultLocale } from '@bigcommerce/catalyst-core/i18n/routing';

Cypress.Commands.add('getCtx', (path?: string) => {
    cy.url().then((url) => {
        if (!path) {
            path = new URL(url).pathname;
        }

        const defaultChannelId = Cypress.env('BIGCOMMERCE_CHANNEL_ID') ?? '1';

        const m = path.match(/^\/\w{2}\//);
        if (m) {
            const locale = m[0].replace(/\//g, '');
            const channelId = getChannelIdFromLocale(locale) ?? defaultChannelId;

            return {
                locale,
                channelId,
            };
        }

        return {
            locale: defaultLocale,
            channelId: defaultChannelId,
        };
    });
});
