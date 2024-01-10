const path = require('path');
const fs = require('fs');


it('End to end', async () => {
    // ACCUEIL
    await browser.url('http://localhost:3000');
    await browser.pause(1000);
    const title = await browser.getTitle();
    console.log(`Le titre de la page est : ${title}`);
    const screenshotsDirectory = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDirectory)) {
        console.log(`Le dossier n'existe pas   ${__dirname}`);
        fs.mkdirSync(screenshotsDirectory);
    }
    await takeScreenShot(screenshotsDirectory);
    //await expect(title).toBe('Rendez vous');

    // CLIQUER SUR PRENDRE UN RDV
    const linkElement = await $('//a[contains(@href, "/appointment") and contains(text(), "Prendre un rendez vous")]');

    await linkElement.click();
    await browser.pause(1000);
    takeScreenShot(screenshotsDirectory);
    //const isAddressFormPresent = await $('[data-testid="address-form"]').isExisting();
    //expect(isAddressFormPresent).toBe(true);
    const inputElement = await $('.form-control.pac-target-input');
    await inputElement.setValue('Londres');
    const webdriver = browser;
    await webdriver.keys('Enter');
    await browser.pause(1000);
    takeScreenShot(screenshotsDirectory);

    // SELECTIONNER UNE CATEGORIE

    const selectElement = await $('select'); 
    await selectElement.waitForExist();
    await selectElement.selectByVisibleText('Soins Intensifs');
    const findHospitalButton = await $('#findHospitalButton');
    await findHospitalButton.waitForExist();
    await findHospitalButton.click();
    await browser.pause(3000);
    takeScreenShot(screenshotsDirectory);

    // PRENDRE LE RDV
    const firstNameInput = await $('input[name="firstName"]');
    await firstNameInput.setValue('Test firstName');
    const lastNameInput = await $('input[name="lastName"]');
    await lastNameInput.setValue('Test lastName');

    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    const dateInput = await $('input[name="date"]');
    await dateInput.setValue(formattedDate);

    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');

    const formattedTime = `${hours}:${minutes}`;

    const timeInput = await $('input[name="time"]');
    await timeInput.setValue(formattedTime);
    await browser.pause(1000);

    takeScreenShot(screenshotsDirectory);

    const bookAppointmentButton = await $('#bookappointment');
    await bookAppointmentButton.click();


    await browser.pause(1000);
    takeScreenShot(screenshotsDirectory);


    // CLIQUER SUR VOIR LES RDV
    const linkElementRDV = await $('//a[contains(@href, "/appointments") and contains(text(), "Rendez vous")]');
    await linkElementRDV.click();
    await browser.pause(1000);
    takeScreenShot(screenshotsDirectory);

    
});

async function takeScreenShot(screenshotsDirectory) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const screenshotPath = path.join(screenshotsDirectory, `test-screenshot-${timestamp}.png`);
    await browser.saveScreenshot(screenshotPath);
}
