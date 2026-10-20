import { Page } from '@playwright/test';
import { Basemethods } from './base.page';
import Loginpage from '../CommonPage/login.page';

export default class POManager extends Basemethods{
    private loginpage: Loginpage;

    constructor(page:Page){
        super(page)
        this.loginpage=new Loginpage(this.page)


    }

    getloginpage(){
        return this.loginpage
    }

}