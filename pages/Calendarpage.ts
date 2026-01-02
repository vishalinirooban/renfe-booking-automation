import {Page , expect , Locator} from '@playwright/test'
import { acceptcookies } from '../utils/cookies';

 // ---> User select oneway and choose date 

export class CalendarPage {
     
   private readonly page : Page ;
   private readonly calendarButton : Locator;
   private readonly oneWayOption : Locator;
  // private readonly clickmonthpage:Locator;
   //private readonly nextMonthButton: Locator;
   private readonly chooseDate : Locator;
   //private readonly selectPassenger : Locator;
   //private readonly addAdult : Locator;
   //private readonly deleteAdult : Locator;
   //private readonly clickOnCancel: Locator;
   private readonly searchButton : Locator;


  constructor(page:Page) 
  {
      this.page = page;
      this.calendarButton = page.getByText('Fecha ida');
      this.oneWayOption = page.getByText('Viaje solo ida');
     // this.clickmonthpage= page.locator('.lightpick__months');
    // this.nextMonthButton = page.getByRole('button', { name: '→' });
     //this.chooseDate = page.locator('div.lightpick__day.is-available.is-start-date');
     this.chooseDate = page.locator('div.lightpick__day:not(.is-disabled)').first();
     //this.selectPassenger = page.getByText('1 adulto', { exact: true })
     //this.addAdult = page.getByRole('button', { name: 'Añadir adulto' });
     //this.deleteAdult= page.getByRole('button', { name: 'Eliminar adulto' });
      //this.clickOnCancel= page.getByRole('button', { name: 'Cancelar' });
      this.searchButton = page.getByRole('button', { name: /Buscar/i });
  }

 /**  async scrollToCalendar() {
    // Scroll down to make calendar visible
    await this.clickmonthpage.waitFor({ state: 'visible' });
  await this.clickmonthpage.scrollIntoViewIfNeeded();

  }**/
  async selectOneWayDate()
  {
     await acceptcookies(this.page);
     await this.calendarButton.click();
     await acceptcookies(this.page);
     await this.oneWayOption.click();
     //const calendar = this.page.locator('.lightpick:not(.is-hidden)');
      //await calendar.waitFor({ state: 'visible', timeout: 15000 });
     //await this.nextMonthButton.waitFor({ state: 'visible' });
     //await this.nextMonthButton.scrollIntoViewIfNeeded();
     //await this.scrollToCalendar();
     //await this.clickmonthpage.click();
     // await this.nextMonthButton.click();
    await this.chooseDate.click();
 }
  /**async selectPassengerdetails()
  {
     await this.selectPassenger.click();
     await this.addAdult.click();
     await this.deleteAdult.click();
    // await this.clickOnCancel.waitFor({ state: 'visible' });
     await this.clickOnCancel.click();
  }**/



async verifyDefaultPassengerCount() {
    const passengerDisplay = this.page.locator('.rf-passengers-alternative__wrapper');
    await expect(passengerDisplay).toContainText('1 adulto');
}

  async clickonsearch()
  {
    await this.searchButton.click();

}

}
