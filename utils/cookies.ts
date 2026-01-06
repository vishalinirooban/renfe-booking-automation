import {Page} from '@playwright/test';

export async function acceptcookies(page:Page)
{
    const acceptbutton = page.getByRole('button', { name: 'Aceptar todas las cookies' })

    if(await acceptbutton.isVisible())
    {
        await acceptbutton.click()

    }
}



