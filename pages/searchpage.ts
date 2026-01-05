import { Page, expect, Locator } from '@playwright/test'
import { acceptcookies } from '../utils/cookies'

export class Searchpage {


  private readonly page: Page;
  private readonly originComboBox: Locator;
  private readonly originInput: Locator;
  private readonly originOption: Locator
  private readonly destinationInput: Locator;
  private readonly destinationOption: Locator;


  constructor(page: Page) {
    this.page = page;
    this.originComboBox = page.getByRole('combobox', { name: 'Origen' });
    this.originInput = page.locator('label:has-text("ORIGEN")');
    this.originOption = page.getByRole('option', { name: 'MADRID-ATOCHA CERCANÍAS' });
    this.destinationInput = page.getByRole('combobox', { name: 'Destino' });
    this.destinationOption = page.getByRole('option', { name: 'BARCELONA-SANTS' });


  }

  async acceptCookies() {
    await acceptcookies(this.page);
  }

  async selectOriginCity(origin: string) {
    await this.originComboBox.click();
    await this.originInput.fill('');
    await this.originInput.pressSequentially(origin, { delay: 100 });
    const option = this.page.getByRole('option', { name: origin, exact: false }).first();;
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await this.originOption.click();
    await expect(this.originComboBox).toHaveValue(/MADRID-ATOCHA/);
  }

  async selectDestinationCity(destination: string) {
    await this.destinationInput.fill('');
    await this.destinationInput.pressSequentially(destination, { delay: 100 });
    const option = this.page.getByRole('option', { name: destination, exact: false }).first();;
    await option.waitFor({ state: 'visible' });
    await this.destinationOption.click();
    await expect(this.destinationInput).toHaveValue(/BARCELONA-SANTS/);

  }


}