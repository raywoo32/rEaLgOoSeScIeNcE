/** investigatJsons.js
* what it says 
* node investigatJsons.js ./apify_storage/datasets\default\000000001.json
*/


// PART 1: Imports 
var fs = require('fs');


// PART 2: Reading and parsing 
const arg = process.argv.slice(2);
let rawPmids = fs.readFileSync(arg[0].toString()); 
let split = rawPmids.toString().split("\n");
split = split.toString().split("\"");
split = split.toString().split(",");
//console.log(split)

// filter out empty elements
let filtered = split.filter(function (el) {
  return (el != "" && el != null && el != undefined);
});


// filter out duplicates (taken from citation 2)
function getUnique(array){
    var uniqueArray = [];
    for(var value of array){
        if(uniqueArray.indexOf(value) === -1){
            uniqueArray.push(value);
        }
    }
    return uniqueArray;
}
const uniquePMID = getUnique(filtered)

// optionally turn the pmids into urls 
function toURL(array){
    var urls = [];
    for(let i=0; i<array.length; i++){
        urls.push("https://www.ncbi.nlm.nih.gov/pubmed/".concat(array[i]))
    }
    return urls;
}

const urls = toURL(uniquePMID)

const csv = urls.toString()



// PART 3: Writing 
fs.writeFile('formattedURLS.txt', urls, (err) => { 
    // In case of a error throw err. 
    if (err) throw err; 
}) 


/* PART 3: Citations 
https://www.geeksforgeeks.org/javascript-program-to-write-data-in-a-text-file/
https://www.tutorialrepublic.com/faq/how-to-remove-duplicate-values-from-a-javascript-array.php

*/

