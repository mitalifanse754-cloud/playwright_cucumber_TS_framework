import { Locator, Page, expect } from "@playwright/test";

//Create abstract class. all Pages extends this class to use all methods

export abstract class Basemethods {


    constructor(protected readonly page: Page) { }


    async goto(baseUrl: string ='/'): Promise<void> {
        await this.page.goto(baseUrl)
        await this.page.waitForLoadState('networkidle')
    }
    /*-------------------Mouse Interaction-----------*/
    //single click element
    async click(locator: Locator): Promise<void> {
        await locator.click()
    }

    //double click element
    async doubleclick(locator: Locator): Promise<void> {
        await locator.dblclick()
    }

    //Right click element
    async rightclick(locator: Locator): Promise<void> {
        await locator.click({ button: 'right' })
    }

    ///Right click element
    async leftclick(locator: Locator): Promise<void> {
        await locator.click({ button: 'left' })
    }

    //hover the element
    async hover(locator: Locator): Promise<void> {
        await locator.hover()
    }
    /*--------------------Element interaction----------------*/
    //Enter value to element textbox
    async fillvalue(locator: Locator, value: string): Promise<void> {
        await locator.fill(value)
    }

    //Clear value to element textbox
    async clearvalue(locator: Locator): Promise<void> {
        await locator.clear()
    }

    //getText from the Textbox
    async getText(locator: Locator): Promise<string> { //It return string value
        return (await locator.textContent()) ?? " "  //?? return null or undefined if no string.
    }


    //check the checkbox/radio button
    async check(locator: Locator): Promise<void> {
        await locator.check()
    }

    //Uncheck the checkbox/radio button
    async uncheck(locator: Locator): Promise<void> {
        await locator.uncheck()
    }

    //isVisible the element
    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible()
    }
    //isHidden the element
    async isHidden(locator: Locator): Promise<boolean> {
        return await locator.isHidden()
    }

    //To Validate the element not visible ?
    async isNotVisible(locator: Locator): Promise<void> {
        await expect(locator).not.toBeVisible()
    }

    //isEnabled the element
    async isEnabled(locator: Locator): Promise<boolean> {
        return await locator.isEnabled()
    }

    //isDisabled the element
    async isDisabled(locator: Locator): Promise<boolean> {
        return await locator.isDisabled()
    }

    //isEditabled the element
    async isEditabled(locator: Locator): Promise<boolean> {
        return await locator.isEditable()
    }
    /*------------------Dropdown----------------------------*/
    //Select DD by SelectbyText
    async selectByText(locator: Locator, text: string): Promise<void> {
        await locator.selectOption({ label: text })
    }

    //Select DD by SelectbyValue
    async selectByValue(locator: Locator, value: string): Promise<void> {
        await locator.selectOption({ value: value })
    }

    //Select DD by SelectbyIndex
    async selectByIndex(locator: Locator, index: number): Promise<void> {
        await locator.selectOption({ index: index })
    }
    /*---------------------Wait-------------------------------*/
    //Waitfor elementvisible
    async waitforEleVisible(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' })
    }

    //Waitfor elementHidden
    async waitforEleHidden(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'hidden' })
    }
    /*--------------------verification----------------------------*/
    //Verify the text displayed
    async verifyText(locator: Locator, expectedText: string): Promise<void> {
        await expect(locator).toHaveText(expectedText)
    }

    //Verify the title displayed
    async verifyTitle(locator: Locator, title: string): Promise<void> {
        await expect(this.page).toHaveTitle(title)
    }

    //Verify the URL displayed
    async verifyURL(locator: Locator, url: string): Promise<void> {
        await expect(this.page).toHaveTitle(url)
    }
}

























