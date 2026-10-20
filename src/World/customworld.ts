import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit, request, ChromiumBrowser, FirefoxBrowser, WebKitBrowser, } from '@playwright/test';
import { ENV } from '../configs/env';
import POManager from '../main/pages/Abstractmethods/POManager';


//Interface for Initialize world- browser+Context+page
export interface InitCstmWorld extends World {
    browser: Browser
    context: BrowserContext
    page: Page
    poManager: POManager
}


//implementing interface initCstmWorld
export class Customworld extends World implements InitCstmWorld {
    browser!: Browser
    context!: BrowserContext
    page!: Page
    poManager!: POManager

    constructor(options: IWorldOptions) {
        super(options)                  //passes the options to Cucumber's World constructor so it can initialize its own scenario context.
    }


    //----------------Before after each scenario----------------------
    async init(): Promise<void> {

        const browsers = { chromium, firefox, webkit };
        const browserType = browsers[ENV.browser as keyof typeof browsers] ?? chromium;

        switch (ENV.browser) {

            case 'chromium':
                if (ENV.channel === 'chrome') {
                    this.browser = await browserType.launch({
                        headless: ENV.headless,
                        slowMo: ENV.slowMo,
                        channel: ENV.channel,
                        args: ['--start-maximized']
                    });
                    this.context = await this.browser.newContext({
                        baseURL: ENV.baseUrl,
                        viewport: null,
                        ignoreHTTPSErrors: ENV.ignoreHTTPSErrors,

                    });
                }
                else {
                    this.browser = await browserType.launch({
                        headless: ENV.headless,
                        slowMo: ENV.slowMo,
                        channel: ENV.channel,
                        args: ['--start-maximized']
                    });
                    this.context = await this.browser.newContext({
                        baseURL: ENV.baseUrl,
                        viewport: null,
                        ignoreHTTPSErrors: ENV.ignoreHTTPSErrors,

                    });
                }

                /* this.context = await this.browser.newContext({
                    baseURL: ENV.baseUrl,
                    viewport: null,
                    ignoreHTTPSErrors: ENV.ignoreHTTPSErrors,

                }); */
                break
            case 'firefox':
                this.browser = await browserType.launch({
                    headless: ENV.headless,
                    slowMo: ENV.slowMo,
                    args: ['--start-maximized']
                })
                this.context = await this.browser.newContext({
                    baseURL: ENV.baseUrl,
                    viewport: { width: 1920, height: 1080 },
                    ignoreHTTPSErrors: ENV.ignoreHTTPSErrors,

                });
                break
            case 'webkit':
                this.browser = await browserType.launch({
                    headless: ENV.headless,
                    slowMo: ENV.slowMo,
                    args: ['--start-maximized']
                })
                this.context = await this.browser.newContext({
                    baseURL: ENV.baseUrl,
                    viewport: { width: 1920, height: 1080 },
                    ignoreHTTPSErrors: ENV.ignoreHTTPSErrors,

                });
                break

            default:
                throw new Error(`Unsupported browser: ${browserType}`);
        }
/* 
        this.browser = await browserType.launch({
            headless: ENV.headless,
            slowMo: ENV.slowMo,
            args: ['--start-maximized']
        });

        this.context = await this.browser.newContext({
            baseURL: ENV.baseUrl,
            viewport: { width: 1920, height: 1080 },
            ignoreHTTPSErrors: ENV.ignoreHTTPSErrors,

        }); */

        /*  this.context.setDefaultTimeout(ENV.defaultTimeout);
         this.context.setDefaultNavigationTimeout(ENV.navigationTimeout); */
        this.page = await this.context.newPage();
        this.poManager = new POManager(this.page);
    }

    //----------------Teardown after each scenario----------------------
    async teardown(): Promise<void> {

        await this.page?.close();
        await this.context?.close();
        await this.browser?.close();
    }
}

setWorldConstructor(Customworld)