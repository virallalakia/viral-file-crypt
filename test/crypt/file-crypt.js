const chai = require('chai')
const expect = chai.expect

const { cryptFile } = require('../../src/crypt/file-crypt.js')

describe('Encrypt a file', () => {
  const mockSalt = 'mocksalt'
  
  it('verify file encrypt is successful', (done) => {
    cryptFile(mockSalt, './test/resources/test-input-1.txt', './test/resources/test-output-1-mocksalt.txt', function(success) {
      expect(success).to.be.true
      done()
    });
  })
  
  it('verify encrypted file', (done) => {
    cryptFile(mockSalt, './test/resources/test-input-1.txt', './test/resources/test-output-1-mocksalt-verify-file.txt', function(success) {
      expect(success).to.be.true
      // TODO - compare file to verify
      done()
    });
  })
})

describe('Decrypt a file', () => {
  const mockSalt = 'mocksalt'

  it('verify decrypted file', (done) => {
    cryptFile(mockSalt, './test/resources/test-input-1.txt.crypt', './test/resources/test-output-1-mocksalt.txt.crypt', function(success) {
      expect(success).to.be.true
      done()
    });
  })
})
