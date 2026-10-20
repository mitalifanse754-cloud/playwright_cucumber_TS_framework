import { Locator,Page,expect } from '@playwright/test'
import { Basemethods } from '../../pages/Abstractmethods/base.page'

export default class Loginpage extends Basemethods {

    ////////////Locators//////////////////////////////////
    private readonly loginid: Locator
    private readonly password: Locator
    private readonly loginbutton: Locator
    constructor(page: Page) {
        super(page)
        this.loginid = page.locator('#loginid')
        this.password = page.locator('#pwd')
        this.loginbutton = page.getByRole('button', { name: 'Login' })
    }

    ////////////methods//////////////////////////////////
    async gotourl(url:string='/'): Promise<void> {
        await this.goto(url)
        await this.page.waitForTimeout(10000)
    }

    async entercredentials(): Promise<void> {
        await this.fillvalue(this.loginid, 'sa')
        await this.fillvalue(this.password, 'admin')
    }

    async entercredentialswithpara(username: string, password: string): Promise<void> {
        await this.fillvalue(this.loginid, username)
        await this.fillvalue(this.password, password)

    }
    async clkloginbtn(): Promise<void> {
        await this.click(this.loginbutton)
    }

    async validatelogin(): Promise<void> {

        await expect(this.page).toHaveTitle(/^welcome\s.+$/i)
        await this.page.waitForTimeout(2000)

    }

}

