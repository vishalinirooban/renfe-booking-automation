import {test,expect} from '@playwright/test'

test('Get All Users to View Usernames', async ({ request }) => {
   const response = await request.get('https://reqres.in/api/users/1', {
    headers: { 'x-api-key': 'pub_5a5e5aa6704b8ad14c88d321086f95c60325ff60c15c4ed744fc3493098fa6f4' }
});
expect(response.status()).toBe(200);

const responseBody = await response.json();
console.log(responseBody);

});