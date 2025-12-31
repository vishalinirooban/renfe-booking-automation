/*
** Test Case : Search One-Way Train Ticket from Madrid to Barcelona in Homepage
steps:
  ---> Navigate to application URL
  ---> Accept cookies 
  ---> User enter Madrid -atocha in the origin and select from the dropdown
  --->


*/

import {test, expect} from '@playwright/test'
import {TestConfig} from '../../test.config'
import { Searchpage } from '../../pages/searchpage';


test('Search One-Way Train Ticket from Madrid to Barcelona in Homepage', async({page})=>
{
 
    const Config = new TestConfig();
    await page.goto(Config.appUrl); //Navigate to application URL

    const searchpage = new Searchpage(page);
    await searchpage.acceptCookies();
    await searchpage.selectOriginCity("madrid-at");
    await searchpage.selectDestinationCity("barc")
    
 }
)



