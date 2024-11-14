import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    e2e: {
        chromeWebSecurity: false,
        baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
        setupNodeEvents(on, config) {
            config.env = {
                ...config.env,
                ...process.env,
            };

            if (process.env.CYPRESS_BASE_URL) {
                config.baseUrl = process.env.CYPRESS_BASE_URL;
            }

            return config;
        },
    },
});
