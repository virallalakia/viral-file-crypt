const chai = require('chai')
const chaiFiles = require('chai-files')
const fs = require('fs')
const path = require('path')
const os = require('os')

chai.use(chaiFiles);

const expect = chai.expect
const file = chaiFiles.file
const tmpDir = path.join(os.tmpdir(), '' + process.hrtime.bigint())

const { cryptFile } = require('../../src/crypt/file-crypt.js')
const mockSalt = 'mocksalt'

describe('Encrypt a file', () => {
  const inputFilePath = './test/resources/test-file-1.txt'
  const outputFilePath = path.join(tmpDir, 'test-file-1-mocksalt-encrypted.output.txt')
  const expectedOutputFilePath = './test/resources/test-file-1-mocksalt-encrypted.txt'

  before(function() {
    if (!fs.existsSync(tmpDir)){
      fs.mkdirSync(tmpDir);
    }
  })
  
  it('verify file encrypt is successful', (done) => {
    cryptFile(mockSalt, inputFilePath, outputFilePath, function(success) {
      expect(success).to.be.true
      expect(file(outputFilePath)).to.exist
      done()
    });
  })
  
  it('verify encrypted file', (done) => {
    cryptFile(mockSalt, inputFilePath, outputFilePath, function(success) {
      expect(success).to.be.true
      expect(file(outputFilePath)).to.exist
      expect(file(outputFilePath)).to.equal(file(expectedOutputFilePath));
      done()
    });
  })
})

describe('Decrypt a file', () => {
  const inputFilePath = './test/resources/test-file-1-mocksalt-encrypted.txt'
  const outputFilePath = path.join(tmpDir, 'test-file-1-mocksalt-decrypted.txt')
  const expectedOutputFilePath = './test/resources/test-file-1.txt'
  
  it('verify decrypted file', (done) => {
    cryptFile(mockSalt, inputFilePath, outputFilePath, function(success) {
      expect(success).to.be.true
      expect(file(outputFilePath)).to.exist
      expect(file(outputFilePath)).to.equal(file(expectedOutputFilePath));
      done()
    });
  })
})
