const { Command } = require('commander');

const commandParser = new Command();
commandParser
  .option('-s, --salt <salt-value>',
    'salt to be used to encrpyt/decrypt the file(s), same salt needs to be provided to decrypt the encrypted file(s)');
commandParser.option('-i, --input <path-to-input-file>', 'file to be encrpyted/decrypted');

exports.argsParser = commandParser;
