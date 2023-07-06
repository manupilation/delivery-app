const chai = require('chai');
const { CryptData, generateTimestamp } = require('../../app/utils/CryptData');

const { expect } = chai;

describe('CryptData class methods', () => {
  let cryptData;

  beforeEach(() => {
    process.env.CRYPT_KEY = 'mycryptkey';
    process.env.CRYPT_IV = 'mycryptiv';

    cryptData = new CryptData();
  });

  afterEach(() => {
    delete process.env.CRYPT_KEY;
    delete process.env.CRYPT_IV;
  });

  describe('Test encrypt method', () => {
    it('should encrypt the message', () => {
      const message = 'Hello, world!';
      const encrypted = cryptData.encryptString(message);
      expect(encrypted).to.be.a('string').and.not.equal(message);
    });
  });

  describe('Test decrypt method', () => {
    it('should decrypt the encrypted message', () => {
      const message = 'Hello, world!';
      const encrypted = cryptData.encryptString(message);
      const decrypted = cryptData.decryptString(encrypted);
      expect(decrypted).to.contains(message);
    });
  });

  describe('Test timestamp generator method', () => {
    it('should generate a timestamp', () => {
      const timestamp = cryptData.generateTimestamp();
      expect(timestamp).to.be.a('string');
    });
  });

  describe('Test verify method', () => {
    it('should throw an error if the token is expired', () => {
      const timestamp = '2023-07-05T10:00:00Z';
      expect(() => cryptData.verifyExpired(timestamp)).to.throw(Error);
    });

    it('should return true if the token is not expired', () => {
      const timestamp = '2023-07-07T10:00:00Z';
      const result = cryptData.verifyExpired(timestamp);
      expect(result).to.equal(true);
    });
  });

  describe('Test token treatment method', () => {
    it('should split the token into code and timestamp', () => {
      const token = 'abc123-2023/07/06T10:00:00Z';
      const [code, timestamp] = cryptData.trataToken(token);
      expect(code).to.equal('abc123');
      expect(timestamp).to.equal('2023-07-06T10:00:00Z');
    });
  });
});
