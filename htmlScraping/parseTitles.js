/** parseTitles.js
* A script to parse goose related titles
* node formatPMIDS.js <dir with jsons abs path>

node ./parseTitles.js C:/Users/rwoo/Desktop/gooseAbstracts/htmlScraping/apify_storage/datasets/default

*/

// PART 1: Imports 
const fs = require('fs');
const process = require("process");
const path = require("path");

// PART 2: Reading and parsing 
const arg = process.argv.slice(2);
const dir = arg[0].toString(); 
let trainingFinal = "";

// Loop through all the files in the temp directory
fs.readdir(dir, function (err, files) {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }
  let titleString = ""
  let titleArr = [] //to check for duplicates 
  files.forEach(function (file, index) {
    const filepath = path.join(dir, file);
    const json = fs.readFileSync(filepath); 
    const article = JSON.parse(json)
    const title = article.data[0].title
    //console.log(titleArr.includes(title))
    if (titleArr.includes(title) === false) { // 
      titleArr.push(title)
      titleString = titleString.concat(title.toString(), "\n", "<|endoftext|>", "\n")

    }
  });
  // Writing 
  fs.writeFile('gooseTraining.txt', titleString, (err) => { 
    // In case of a error throw err. 
    if (err) throw err; 
  }) 
});

//PART 3: Writing 



/* PART 3: Citations 
https://stackoverflow.com/questions/32511789/looping-through-files-in-a-folder-node-js
*/

