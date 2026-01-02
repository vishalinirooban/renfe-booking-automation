import { Page, Locator } from '@playwright/test';

export class ResultsPage {
    private readonly page: Page;
    private readonly dateCard: Locator;
    private readonly nextDayButton: Locator;
    private readonly trainCard:Locator;
    private readonly pricerange:Locator;
    private readonly journeyTime:Locator;

    constructor(page: Page) {
        this.page = page;
        // Specifically locate cards in the results section
        this.dateCard = page.locator('.rescalendar_day_cells')
        this.nextDayButton = page.locator('button.move_to_tomorrow:visible')
        this.trainCard = page.locator('div:visible')
        this.pricerange =page.locator('.precio-final')
        this.journeyTime = page.locator('#tren_1_item1')
    }

    async findTicketInPriceRange(min: number , max:number , maxattempt:number = 30)
    {
        for (let attempt = 1; attempt <= maxattempt; attempt++) {
        console.log(`--- Attempt ${attempt}: Checking availability ---`);
        await this.dateCard.isVisible();

        const cardCount = await this.trainCard.count();
        //console.log(`Found ${cardCount} train options.`);

        // 3. Inner Loop: Verify each train's Price and Journey Time
        for (let i = 0; i < cardCount; i++) {
           const card = this.trainCard.nth(i);

            // Extract Journey Time (Duration)
            // Note: Renfe typically uses '.re-card-train__duration-number'
            const duration = await this.journeyTime.innerText();

            // Extract and Parse Price
            const priceRaw = await this.pricerange.first().innerText();
            const price = parseFloat(priceRaw.replace(/[^\d,]/g, '').replace(',', '.'));

            // Verification Logic
            if (price >= min && price <= max) {
                console.log(`✅ MATCH FOUND:`);
                console.log(`   - Journey Time: ${duration}`);
                console.log(`   - Verified Price: ${price}€`);
                
                await card.click();
                return; // Stop searching and proceed to next page
            } else {
                console.log(`   - Skipping Train ${i + 1}: ${price}€ (Duration: ${duration})`);
            }
        }

        // 4. Navigation: Move to next day if no match found
        if (await this.nextDayButton.isVisible()) {
            console.log("No ticket in range found today. Clicking Next Day...");
        await this.nextDayButton.click();
        //console.log(await this.trainCard.isVisible());


        
        
    }

}
    }
}
