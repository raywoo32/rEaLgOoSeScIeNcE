/** htmlScraping.js
* A script to scrape abstracts from pubmed relating to best match for the keywork "geese"
* node htmlScraping.js CSV.txt
* prereq: npm install apify --save

node htmlScraping.js formattedURLS.txt

*/

// PART 1: Imports 
const Apify = require('apify');
const fs = require('fs');


// PART 2: Reading and parsing 
const arg = process.argv.slice(2);
const csv = fs.readFileSync(arg[0].toString()); 
const pmids = csv.toString().split(",");

Apify.main(async () => {

    // Prepare a list of URLs to crawl
    const requestQueue = await Apify.openRequestQueue();
    for (let i=0; i<pmids.length; i++) {
        await requestQueue.addRequest({ url: pmids[i]});
    }

    // Crawl the URLs
    const crawler = new Apify.CheerioCrawler({
        requestQueue,
        handlePageFunction: async ({ request, response, body, contentType, $ }) => {
            const data = [];

            // Do some data extraction from the page with Cheerio.
            data.push({
                title: $('h1').eq(1).text(),
                abstract: $('p').eq(10).text(),
            });

            // Save the data to dataset.
            await Apify.pushData({
                url: request.url,
                data,
            });
        },
    });

    await crawler.run();
});





/*
//Title 
document.getElementsByTagName("H1")[1].innerHTML
//Abstract
document.getElementsByTagName("P")[9].innerHTML
*/



/* Citations: 
https://stackoverflow.com/questions/22754315/for-loop-for-htmlcollection-elements
https://stackoverflow.com/questions/38785877/spoofing-ip-address-when-web-scraping-python
https://www.npmjs.com/package/apify
https://github.com/apifytech/apify-js
https://www.codementor.io/@hirenpatel545/5-best-javascript-web-scraping-libraries-and-tools-sicow2rx9
https://sdk.apify.com/docs/examples/basic-crawler

*/
