import { channel } from 'diagnostics_channel';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const ENV = {

    baseUrl: process.env.BASE_URL || 'https://example.com',
    deviceUrl: process.env.DEVICE_URL || '',
    env: process.env.ENV || 'staging',


    browser: (process.env.BROWSER as 'chromium' | 'firefox' | 'webkit') || 'chromium',
    headless: process.env.HEADLESS !== 'false',
    slowMo: parseInt(process.env.SLOW_MO || '0'),
    ignoreHTTPSErrors: process.env.IGNORE_HTTPS_ERRORS === 'true',
    channel: (process.env.CHANNEL as 'chrome' | 'msedge') || 'chrome'
    
} as const;