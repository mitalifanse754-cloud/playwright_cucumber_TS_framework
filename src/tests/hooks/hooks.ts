import { chromium, Page, Browser, BrowserContext } from "@playwright/test";
import { Before,After, BeforeAll, AfterAll,setDefaultTimeout } from "@cucumber/cucumber";
import "../../World/customworld";
import type { InitCstmWorld } from "../../World/customworld";
setDefaultTimeout(1000*60*2)


//Create object for World (interface) using Type alias (Typeintersections)
type HookWorld =  InitCstmWorld & {
  init(): Promise<void>;
  teardown(): Promise<void>;
};



Before(async function (this:HookWorld) {

    await this.init()


})

After(async function (this:HookWorld) {
    await this.teardown()

})

