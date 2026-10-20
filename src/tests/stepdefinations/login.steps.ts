import { Given, Given as And, When, Then, DataTable } from '@cucumber/cucumber'
import type { InitCstmWorld } from '../../World/customworld'
import { ENV } from '../../configs/env'

Given('Open Cosec Web', async function (this: InitCstmWorld) {
    await this.poManager.getloginpage().goto(ENV.baseUrl)
});

And('Login with user', async function (this: InitCstmWorld) {
    const loginPage = this.poManager.getloginpage()
    await loginPage.entercredentials()
    await loginPage.clkloginbtn()
    await loginPage.validatelogin()
});


And('Login with username {string} and pwd {string}', async function (this: InitCstmWorld, username: string, password: string) {
    const loginPage = this.poManager.getloginpage()
    await loginPage.entercredentialswithpara(username, password)
    await loginPage.clkloginbtn()
    await loginPage.validatelogin()
});


When('Login with user with username {string} and password {string}', async function (this: InitCstmWorld, username: string, password: string) {
    const loginPage = this.poManager.getloginpage()
    await loginPage.entercredentialswithpara(username, password)
    await loginPage.clkloginbtn()
});

Then('validate login {string}', async function (this: InitCstmWorld, validation: string) {
    const loginPage = this.poManager.getloginpage()
    if (validation.toLowerCase() === 'valid') {
        await loginPage.validatelogin()
    }
    else {
        await loginPage.waitforEleVisible(this.page.locator('#ValidationMsg'))
    }
})


And('Login with user in cosec', async function (this: InitCstmWorld, dataTable: DataTable) {
    const loginPage = this.poManager.getloginpage()
    for (const { username, password, validate } of dataTable.hashes()) {
        await loginPage.goto(ENV.baseUrl)
        await loginPage.entercredentialswithpara(username, password)
        await loginPage.clkloginbtn()

        if (validate.toLowerCase() === 'valid') {
            await loginPage.validatelogin()
        } else {
            await loginPage.waitforEleVisible(this.page.locator('#ValidationMsg'))
        }
    }
})