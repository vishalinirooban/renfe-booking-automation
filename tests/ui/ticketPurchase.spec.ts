/*
** Test Case : Search One-Way Train Ticket from Madrid to Barcelona in Homepage
steps:
  ---> Navigate to application URL
  ---> Accept cookies 
  ---> User select Madrid -atocha from the dropdown in the origin field
  ---> User select Barcelona-sants from the dropdown in the destination field
 


*/

import { test, expect } from '@playwright/test'
import { TestConfig } from '../../test.config'
import { Searchpage } from '../../pages/searchpage';
import { CalendarPage } from '../../pages/Calendarpage';
import { ResultsPage } from '../../pages/Resultpage';

test.beforeEach(async ({ page }) => {
  const Config = new TestConfig();
  await page.goto(Config.appUrl);
})

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(3000);
  await page.close();
})


test('Search One-Way Train Ticket from Madrid to Barcelona in Homepage', async ({ page }) => {


  const searchpage = new Searchpage(page);

  await searchpage.acceptCookies();
  await searchpage.selectOriginCity("madrid-at");
  await searchpage.selectDestinationCity("barc")


  const calendarPage = new CalendarPage(page);
  await calendarPage.selectOneWayDate();
  await calendarPage.verifyDefaultPassengerCount();
  await calendarPage.clickonsearch();


  const resultpage = new ResultsPage(page);
  await resultpage.findTicketInPriceRange(50, 60);







}
)



