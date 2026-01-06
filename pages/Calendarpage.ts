import { Page, expect, Locator } from '@playwright/test'
import { acceptcookies } from '../utils/cookies';

// ---> User select oneway and choose date 

export class CalendarPage {

  private readonly page: Page;
  private readonly calendarButton: Locator;
  private readonly oneWayOption: Locator;
  private readonly chooseDate: Locator;
  private readonly selectAcceptButtoninCalendar: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.calendarButton = page.locator('#first-input');
    this.oneWayOption = page.locator("label[for='trip-go']");
    this.chooseDate=page.locator("(//div[contains(@class,'is-today') and contains(@class,'is-start-date')])[1]");
    this.selectAcceptButtoninCalendar = page.getByRole('button', { name: 'Aceptar' });
    this.searchButton = page.getByRole('button', { name: /Buscar/i });
  }

  async selectOneWayDate() {
    await acceptcookies(this.page);
    await this.calendarButton.click();
    const calendarContainer = this.page.locator('.lightpick:not(.is-hidden)');
    await expect(calendarContainer).toBeVisible();
    //await acceptcookies(this.page);
    await this.oneWayOption.click();
    await this.chooseDate.dispatchEvent('click');
    await this.selectAcceptButtoninCalendar.dispatchEvent('click');
    await expect(calendarContainer).toBeHidden()
  }



  async verifyDefaultPassengerCount() {
    const passengerDisplay = this.page.locator('.rf-passengers-alternative__wrapper');
    await expect(passengerDisplay).toContainText('1 adulto');

  }

  async clickonsearch() {
    await expect(this.searchButton).toBeEnabled();
    await this.searchButton.click();

  }

}
