import { Given, Given as And, When, Then, DataTable, setDefaultTimeout } from '@cucumber/cucumber'

import { Page, Browser, chromium, expect } from '@playwright/test'
import { error } from 'node:console'
setDefaultTimeout(60000)
let browser: Browser
let page: Page

Given('Open Cosec Web', async function () {
    browser = await chromium.launch(
        {
            headless: false,
            channel: "chrome",
            args: ['--start-maximized']
        })
    page = await browser.newPage({ viewport: null })
    await page.goto('http://192.168.27.135/cosec/login')
    await page.waitForLoadState('networkidle')
});

And('Login with user', async function () {
    await page.locator('#loginid').fill('sa')
    await page.locator('#pwd').fill('admin')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveTitle(/^welcome\s.+$/i)
    await page.waitForTimeout(2000)
    await page.close()
    await browser.close()
});


And('Login with username {string} and pwd {string}', async function (username: string, password: string) {
    await page.locator('#loginid').fill(username)
    await page.locator('#pwd').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveTitle(/^welcome\s.+$/i)
});


When('Login with user with username {string} and password {string}', async function (username: string, password: string) {
    await page.locator('#loginid').fill(username)
    await page.locator('#pwd').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
});

Then('validate login {string}', async function (validation: string) {
    if (validation.toLowerCase() === 'valid') {
        await expect(page).toHaveTitle((/^welcome\s.+$/i))
    }
    else {
        const errormsg = await page.locator('#ValidationMsg')
        await expect(errormsg).toBeVisible()
        console.log(errormsg)
    }
    await page.waitForTimeout(2000)
    await page.close()
    await browser.close()
});

And('Login with user in cosec', async function (dataTable: DataTable) {
    const loginUrl = page.url()
    try {
        for (const { username, password, validate } of dataTable.hashes()) {
            await page.close()
            page = await browser.newPage({ viewport: null })
            await page.goto(loginUrl)
            await page.locator('#loginid').fill(username)
            await page.locator('#pwd').fill(password)
            await page.getByRole('button', { name: 'Login' }).click()

            if (validate.toLowerCase() === 'valid') {
                await expect(page).toHaveTitle((/^welcome\s.+$/i))
            }
            else {
                const errormsg = await page.locator('#ValidationMsg')
                await expect(errormsg).toBeVisible()
                console.log(errormsg)
            }
        }
    }
    finally {
        await page.waitForTimeout(2000)
        await page.close()
        await browser.close()
    }
})