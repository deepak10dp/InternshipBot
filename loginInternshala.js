const puppeteer = require('puppeteer');

(async () => {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.goto('https://www.internshala.com/login');

        await page.waitForSelector('#email');
        await page.type('#email', '1011deepakmessi@gmail.com');

        await page.waitForSelector('#password');
        await page.type('#password', '@Deepak2021');

        await Promise.all([
            page.waitForNavigation(),
            page.click('#login_submit'),
        ]);

        const isLoggedIn = await page.evaluate(() => document.querySelector('.logged-in')!== null);
        console.log("Logged in successfully!");

        await page.waitForSelector('#hamburger_menu_key', { visible: true });
        await page.evaluate(() => document.querySelector('#hamburger_menu_key').click());

        await page.waitForSelector('a[href="/internships"]', { visible: true });
        await page.$eval('a[href="/internships"]', (element) => element.click());

        await page.waitForNavigation();
        await page.waitForSelector('.individual_internship.visibilityTrackerItem', { visible: true });

        for (let i = 0; i < 10; i++) {
            const firstInternshipCard = await page.$('.individual_internship.visibilityTrackerItem:first-child');
            if (!firstInternshipCard) {
                console.log("No more internships found.");
                break;
            }

            await page.evaluate((selector) => {
                document.querySelector(selector).click();
            }, '[data-source_cta="view_details"]');

            await page.waitForNavigation();

            await page.waitForSelector('#easy_apply_button', { visible: true });
            await page.evaluate(() => {
                document.querySelector('#easy_apply_button').click();
            });

            await page.waitForSelector('.copyCoverLetterTitle', { visible: true });
            await page.evaluate(() => {
                document.querySelector('.copyCoverLetterTitle').click();
            });

            await page.waitForSelector('#submit', { visible: true });
            await new Promise(resolve => setTimeout(resolve, 1000)); // Delay to ensure any animations or dynamic loading

            // Your existing logic for filling the form goes here
            const textareaSelector = 'textarea[placeholder="Enter text ..."]'; // Change "uniqueLabel" to the actual label or placeholder you're targeting
            // Or, if using placeholder:
            // const textareaSelector = 'textarea[placeholder="uniquePlaceholder"]'; // Change "uniquePlaceholder" to the actual placeholder

            // Use $$ to get all matching elements
            const textareaElements = await page.$$(textareaSelector);

            // Iterate over each textarea element and type into it
            for (let textarea of textareaElements) {
                await textarea.type("In implementing Django for a website, I encountered a challenge with user authentication and permissions. Researching Django's documentation and online tutorials, I set up custom user models and defined roles with appropriate permissions. Utilizing Django's built-in decorators, like @login_required and @permission_required, I effectively restricted access to certain views based on user roles, ultimately resolving the complex coding problem");
            }

            

            //checking for
            // Scroll the button into view and click it using JavaScript
            const isButtonClicked = await page.evaluate(() => {
                const submitButton = document.querySelector('#submit');
                if (submitButton) {
                    submitButton.scrollIntoView({behavior: 'smooth', block: 'center'});
                    submitButton.click();
                    return true;
                }
                return false;
            });

            if (isButtonClicked) {
                console.log(`Submitted application for internship ${i + 1}.`);
            } else {
                console.log(`Submit button not found or not interactable for internship ${i + 1}.`);
            }


            ///navigating to back page
            const targetHref = "https://internshala.com/internships/matching-preferences/";

            // Click the <a> element with the specified href attribute
            await page.evaluate((href) => {
            document.querySelector(`a[href="${href}"]`).click();
            }, targetHref);


            // Navigating back to the internship listing page
            await page.goto('https://www.internshala.com/internships');
           // Adjust the delay as needed
        }

        console.log("Completed navigating to internship details.");
    } catch (error) {
        console.error(error);
    }
})();













































// const puppeteer = require('puppeteer');

// (async () => {
//     let browser;

//     try {
//         browser = await puppeteer.launch({headless: false});
//         const page = await browser.newPage();

//         await page.goto('https://www.internshala.com/login');

//         await page.waitForSelector('#email');
//         await page.type('#email', '1011deepakmessi@gmail.com');

//         await page.waitForSelector('#password');
//         await page.type('#password', '@Deepak2021');

//         await Promise.all([
//             page.waitForNavigation(),
//             page.click('#login_submit'),
//         ]);

//         const isLoggedIn = await page.evaluate(() => document.querySelector('.logged-in') !== null);
//         console.log("Logged in successfully!");

//         await page.waitForSelector('#hamburger_menu_key', {visible: true});
//         await page.evaluate(() => document.querySelector('#hamburger_menu_key').click());

//         await page.waitForSelector('a[href="/internships"]', {visible: true});
//         await page.$eval('a[href="/internships"]', (element) => element.click());

//         await page.waitForNavigation();
//         await page.waitForSelector('.individual_internship.visibilityTrackerItem', {visible: true});

//         for (let i = 0; i < 10; i++) {
//             const firstInternshipCard = await page.$('.individual_internship.visibilityTrackerItem:first-child');
//             if (!firstInternshipCard) {
//                 console.log("No more internships found.");
//                 break;
//             }

//             await page.evaluate((selector) => {
//                 document.querySelector(selector).click();
//             }, '[data-source_cta="view_details"]');

//             await page.waitForNavigation();

//             await page.waitForSelector('#easy_apply_button', {visible: true});
//             await page.evaluate(() => {
//                 document.querySelector('#easy_apply_button').click();
//             });

//             await page.waitForSelector('.copyCoverLetterTitle', {visible: true});
//             await page.evaluate(() => {
//                 document.querySelector('.copyCoverLetterTitle').click();
//             });

//             await page.waitForSelector('#submit', {visible: true});
//             await new Promise(resolve => setTimeout(resolve, 1000)); // Delay to ensure any animations or dynamic loading



          


//             const textareaSelector = 'textarea[placeholder="Enter text ..."]'; // Change "uniqueLabel" to the actual label or placeholder you're targeting
//             // Or, if using placeholder:
//             // const textareaSelector = 'textarea[placeholder="uniquePlaceholder"]'; // Change "uniquePlaceholder" to the actual placeholder

//             // Use $$ to get all matching elements
//             const textareaElements = await page.$$(textareaSelector);

//             // Iterate over each textarea element and type into it
//             for (let textarea of textareaElements) {
//                 await textarea.type("In implementing Django for a website, I encountered a challenge with user authentication and permissions. Researching Django's documentation and online tutorials, I set up custom user models and defined roles with appropriate permissions. Utilizing Django's built-in decorators, like @login_required and @permission_required, I effectively restricted access to certain views based on user roles, ultimately resolving the complex coding problem");
//             }

            

//             //checking for
//             // Scroll the button into view and click it using JavaScript
//             const isButtonClicked = await page.evaluate(() => {
//                 const submitButton = document.querySelector('#submit');
//                 if (submitButton) {
//                     submitButton.scrollIntoView({behavior: 'smooth', block: 'center'});
//                     submitButton.click();
//                     return true;
//                 }
//                 return false;
//             });

//             if (isButtonClicked) {
//                 console.log(`Submitted application for internship ${i + 1}.`);
//             } else {
//                 console.log(`Submit button not found or not interactable for internship ${i + 1}.`);
//             }


//             ///navigating to back page
//             const targetHref = "https://internshala.com/internships/matching-preferences/";

//             // Click the <a> element with the specified href attribute
//             await page.evaluate((href) => {
//             document.querySelector(`a[href="${href}"]`).click();
//             }, targetHref);

//             // Wait for navigation to complete
//             await page.waitForNavigation({ waitUntil: 'networkidle0' });


//             await page.waitForNavigation({ waitUntil: 'networkidle2' });

        
//         }

//         console.log("Completed navigating to internship details.");
//     } catch (error) {
//         console.error(error);
//     }
// })();
