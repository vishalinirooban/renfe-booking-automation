import { Page, Locator,expect,test} from '@playwright/test';

export class ResultsPage {
    private readonly page: Page;
    private readonly dateCard: Locator;
    private readonly titleOriginDestination: Locator;
    private readonly nextDayButton: Locator;
    private readonly listoftraindetails: Locator;


    constructor(page: Page) {
        this.page = page;
        this.dateCard = page.locator('.rescalendar_day_cells')
        this.titleOriginDestination = page.locator('div.lugares:visible')
        this.nextDayButton = page.locator('button.move_to_tomorrow:visible')
        this.listoftraindetails = page.locator('#listaTrenesTBodyIda');


        // page.getByTitle('Lista de trenes disponibles para la ida')

    }

    async findTicketInPriceRange(min: number, max: number, max_attempt = 30) {
        let pricefound = false;

         const reportLines: string[] = [];
        for (let attempt = 1; attempt >= 0 && pricefound === false; attempt++) {
            console.log(`----Attempt number : ${attempt}`)
            reportLines.push(`origin and destination:`, await this.titleOriginDestination.innerText());

            //await this.dateCard.isVisible();
            const trainLocators = await this.listoftraindetails.locator('> div').all();
            const count = trainLocators.length;
            reportLines.push(`Total trains found: ${count}`);

            //console.log('train details:',await this.listoftraindetails.innerText());

            for (const train of trainLocators) {
                const traininfo = await train.getAttribute('aria-label')
                reportLines.push(`Train Info >> Departure: ${traininfo}`);

                const priceLabel = train.locator('span').filter({ hasText: 'Precio desde' }).first();

               if(await priceLabel.isVisible()) {
                    const priceRaw = await priceLabel.innerText();
                    console.log(`price of the train >> ${priceRaw}`);

                    const priceSelector = parseFloat(priceRaw.replace(/[^\d,]/g, '')
                                                             .replace(',', '.'));
                    reportLines.push(`Price Found: ${priceSelector}€`);

                    if (priceSelector >= min && priceSelector <= max) {
                        pricefound = true;
                        reportLines.push(`Ticket found within the target price range (50€ - 60€)`)
                        const basicfare = train.getByText('Precio más bajo', { exact: true });
                        await basicfare.click();
                        console.log(`Expanded train details`)
                        const basicFareOption = train.locator('span').filter({ hasText: 'Básico' }).first();
                        await basicFareOption.waitFor({ state: 'visible', timeout: 5000 });
                        await basicFareOption.click();
                        console.log(`Selected basic fare`)
                        this.page.getByRole('button', { name: /Seleccionar/i }).click();
                        this.page.locator('#aceptarConfirmacionFareUpgrade').first().click();
                        break;
                        
                    }
                }else{
                    reportLines.push(`No price details found for this specific train`)
                    
                }
                
            }
            if (!pricefound) {
                await this.nextDayButton.waitFor({ state: 'visible', timeout: 5000 });
                const oldResults = await this.listoftraindetails.innerText();
                  await this.nextDayButton.click();
                 const spinner = this.page.locator('.rf-loading, #puntosRecarga-loading'); 
                  await expect(async () => {
                    const newResults = await this.listoftraindetails.innerText();
                      expect(newResults).not.toBe(oldResults);
                   }).toPass({ timeout: 10000 });
                    await spinner.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
                    await this.page.waitForLoadState('networkidle');
                } 
                }
                // ❗ Final assertion
              expect(pricefound).toBeTruthy();

    // ✅ ATTACH RESULTS TO PLAYWRIGHT HTML REPORT
    await test.info().attach('Train Search Results', {
      body: reportLines.join('\n'),
      contentType: 'text/plain'
    });
        }
    }



