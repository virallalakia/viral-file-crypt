const { argsParser } = require('../args/args-parser.js');
const { cryptFile } = require('../crypt/file-crypt.js');

argsParser.parse(process.argv);

const salt = argsParser.opts().salt;
const inputFilePath = argsParser.opts().input;
const outputFilePath = inputFilePath + '.crypt';

console.log(`salt: ${salt}`);
console.log(`input-file: ${inputFilePath}`);
console.log(`output-file: ${outputFilePath}`);

cryptFile(salt, inputFilePath, outputFilePath, function(success) {
  if (success) {
    console.log('File crypted successfully.');
  } else {
    console.log('Unable to crypt file.');
  }
});
