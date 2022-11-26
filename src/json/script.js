// 1
'use strict';

const fs = require('fs'); // reader
var myJsonAbc = require("jsonabc");
const path = require("path"); // sort object

var jsonPath = 'jsonPath/json2.json';

function readSortAndWriteJsonFile(pathToFile) {
  let rawdata = fs.readFileSync(pathToFile);
  let student = JSON.parse(rawdata);
  var sorted = myJsonAbc.sortObj(student);

  var stringified = JSON.stringify(sorted, null, 4)

  fs.writeFileSync('jsonPath/json2-copy.json', stringified);
}

readSortAndWriteJsonFile('jsonPath/json2.json');






// reading files from folder

function readAllFilesFromPath(filesPath) {
  const path = require('path');
  const directoryPath = path.join(__dirname, filesPath);
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      let fullPath = filesPath + file;
      console.log(fullPath);

      // remove
      try {
        fs.unlinkSync(fullPath)
        //file removed
      } catch(err) {
        console.error(err)
      }

      readSortAndWriteJsonFile(String(fullPath));
    });
  });
}

readAllFilesFromPath('');

