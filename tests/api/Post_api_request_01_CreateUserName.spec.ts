/*
Test : Create Username
Request Type : post

*/

import { test, expect } from '@playwright/test'

test('Create New User', async ({ request }) => {
    const response = await request.post("https://reqres.in/api/users", {
        data: {
            "username": "Morpheus",
            "email": "janet.weaver@reqres.in",
            "password": "LionKing"


        },
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'pub_5a5e5aa6704b8ad14c88d321086f95c60325ff60c15c4ed744fc3493098fa6f4'
        }

    })

    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    expect(responseBody).toHaveProperty('id');
    expect(responseBody.username).toBe('Morpheus');

    const dynamicId = responseBody.id; 
    console.log(`The generated ID is: ${dynamicId}`);  

    //const getresponse = request.get('https://reqres.in/api/users/${dynamicId}');
    
  

});
