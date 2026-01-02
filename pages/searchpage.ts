import {Page , expect , Locator} from '@playwright/test'
import { acceptcookies } from '../utils/cookies'

export class Searchpage {

    //locators
    private readonly page : Page;
    private readonly originComboBox : Locator;
    private readonly originInput : Locator;
    private readonly originOption : Locator
    private readonly destinationInput : Locator;
    private readonly destinationOption : Locator;
   
    //constructors
    constructor(page:Page)
    {
        this.page =page;
        this.originComboBox = page.getByRole('combobox', { name: 'Origen' });
        this.originInput = page.locator('label:has-text("ORIGEN")');
        this.originOption =page.getByRole('option', { name: 'MADRID-ATOCHA CERCANÍAS' });
        this.destinationInput = page.getByRole('combobox', { name: 'Destino' });
        this.destinationOption = page.getByRole('option', { name: 'BARCELONA-SANTS' });
        
        
    }

    //action methods

    async acceptCookies() {
    await acceptcookies(this.page);
  }

 async selectOriginCity(origin: string) 
  {
  await this.originComboBox.click();
  await this.originInput.fill(origin);
  await this.originOption.click();
  }

  async selectDestinationCity(destination: string)
  {
   await this.destinationInput.fill(destination);
   await this.destinationOption.click();

  }

  

  
  
}