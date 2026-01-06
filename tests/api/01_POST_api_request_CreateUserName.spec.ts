/*
Test : Create Username
Request Type : post

*/

import { test, expect } from '@playwright/test'

test('Create New User', async ({ request }, testInfo) => {
    const response = await request.post("https://reqres.in/api/users", {
        data: {
            "username": "Morpheus",
            "email": "janet.weaver@reqres.in",
            "password": "LionKing"


        },
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'pro_5de24128d5eade71c593b14496bd09519ac6f405802a6f85'
        }

    })

    const responseBody = await response.json();
    console.log(responseBody);
    const dynamicId = responseBody.id;

    await test.step(`Extracted Created ID: ${dynamicId}`, async () => {
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    expect(responseBody).toHaveProperty('id');
    expect(responseBody.username).toBe('Morpheus');

    });

   
  await testInfo.attach('User Creation Response', {
        body: JSON.stringify(responseBody, null, 2),
        contentType: 'application/json'
    });

   
    
});
