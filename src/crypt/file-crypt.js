var fs = require("fs");

exports.cryptFile = function(salt, inputFilePath, outputFilePath, callbackFn) {
  const saltNums = salt.split("").map(e => e.codePointAt(0));
  var saltIndex = 0;

  var rs = fs.createReadStream(inputFilePath);
  rs.setEncoding('UTF8');
  var ws = fs.createWriteStream(outputFilePath);

  rs.on('error', function(err) {
    callbackFn(false);
  });

  rs.on('end',function() {
    ws.end();
    callbackFn(true);
  });

  rs.on('data', function(chunk) {
    var processedChunk = "";
    for (var i = 0; i < chunk.length; i++) {
      processedChunk += String.fromCodePoint(chunk.codePointAt(i) ^ saltNums[saltIndex++]);
      if (saltIndex >= saltNums.length) {
        saltIndex %= saltNums.length;
      }
    }
    ws.write(processedChunk, 'UTF8');
  });
}
