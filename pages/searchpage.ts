import {Page , expect , Locator} from '@playwright/test'
import { acceptcookies } from '../utils/cookies'

/*
class ClassName {
  
  // properties
  private property1: Type;
  private property2: Type;

  // constructor
  constructor(param1: Type, param2: Type) {
    this.property1 = param1;
    this.property2 = param2;

    methodName(param1: Type, param2: Type): ReturnType {
    // code here
  }

  async anotherMethod(): Promise<void> {
    // async code here
  }
}

  }
}
*/

export class Searchpage {

    //locators
    private readonly page : Page;
    private readonly originComboBox : Locator;
    private readonly originInput : Locator;
    private readonly originOption : Locator
    private readonly destinationComboBox : Locator;
    private readonly destinationInput : Locator;
    private readonly destinationOption : Locator;



    //constructors
    constructor(page:Page)
    {
        this.page =page;
        this.originComboBox = page.getByRole('combobox', { name: 'Origen' });
        this.originInput = page.locator('label:has-text("ORIGEN")');
        this.originOption =page.getByRole('option', { name: 'MADRID-ATOCHA CERCANÍAS' });
        this.destinationComboBox =page.getByRole('combobox', { name: 'Destino' });
        this.destinationInput = page.getByRole('combobox', { name: 'Destino' });
        this.destinationOption = page.getByRole('option', { name: 'BARCELONA-SANTS' });
        

    }

    //action methods

    async acceptCookies() {
    await acceptcookies(this.page);
  }

 /* async openOriginSelection(){
    await this.originComboBox.click();
  }

  async enterOrigin(origin: string){
    await this.originInput.fill("madrid-atocha");

  }

  async selectOrigin(){
    await this.originOption.click();
  }*/

  async selectOriginCity(origin: string) 
  {
  await this.originComboBox.click();
  await this.originInput.fill(origin);
  await this.originOption.click();
  }

  async selectDestinationCity(destination: string)
  {
   await this.destinationComboBox.click();
   await this.destinationInput.fill(destination);
   await this.destinationOption.click();

  }
  
}