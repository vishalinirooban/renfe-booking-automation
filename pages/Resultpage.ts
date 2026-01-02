import { Page, Locator } from '@playwright/test';

export class ResultsPage {
    private readonly page: Page;
    private readonly dateCard: Locator;
    private readonly titleOriginDestination : Locator;
    private readonly nextDayButton: Locator;
    private readonly listoftraindetails :Locator;
   

    constructor(page: Page) {
        this.page = page;
        this.dateCard = page.locator('.rescalendar_day_cells')
        this.titleOriginDestination = page.locator('div.lugares:visible')
        this.nextDayButton = page.locator('button.move_to_tomorrow:visible')
        this.listoftraindetails = page.locator('#listaTrenesTBodyIda');
        
        
       // page.getByTitle('Lista de trenes disponibles para la ida')
       
    }

    async findTicketInPriceRange()
    {
        
        console.log('origin and destination:', await this.titleOriginDestination.innerText());
        await this.dateCard.isVisible();
        await this.nextDayButton.click();

        const trainLocators = await this.listoftraindetails.locator('> div').all();
        const count = trainLocators.length;
        console.log(`Total trains found: ${count}`);
        
        //console.log('train details:',await this.listoftraindetails.innerText());

        for (const train of trainLocators) 
            {
                const traininfo = await train.getAttribute('aria-label')
                console.log(traininfo);

                
            }
}
}


    

