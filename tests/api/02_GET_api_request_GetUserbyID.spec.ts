import {test,expect} from '@playwright/test'

test('Get All Users to View Usernames', async ({ request},testInfo) => {
   const response = await request.get('https://reqres.in/api/users/1', {
    headers: { 'x-api-key': 'pro_5de24128d5eade71c593b14496bd09519ac6f405802a6f85' }
});
expect(response.status()).toBe(200);

const responseBody = await response.json();
console.log(responseBody);


    await testInfo.attach('full-user-data', {
        body: JSON.stringify(responseBody, null, 2),
        contentType: 'application/json'
    });

});