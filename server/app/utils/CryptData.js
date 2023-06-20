require('dotenv').config();

const { CRYPT_KEY, CRYPT_IV } = process.env;

const crypto = require('crypto');

class CryptData {
  constructor() {
    this.method = "AES-256-CBC";
    this.setKeyAndIv();
  }

  encryptString(message) {
    message += "-" + generateTimestamp();
    let encryptor = crypto.createCipheriv(this.method, this.key, this.iv);
    let aes_encrypted = encryptor.update(message , 'utf-8', 'base64') + encryptor.final('base64');

    return Buffer.from(aes_encrypted).toString('base64');
}

  setKeyAndIv() {
    this.key = crypto.createHash('sha512').update(CRYPT_KEY, 'utf-8').digest('hex').substring(0, 32);
    this.iv = crypto.createHash('sha512').update(CRYPT_IV, 'utf-8').digest('hex').substring(0, 16)
  }

  decryptString(message) {
    const buff = Buffer.from(message, 'base64');
    message = buff.toString('utf-8');
    const decryptor = crypto.createDecipheriv(this.method, this.key, this.iv);
    return decryptor.update(message, 'base64', 'utf8') + decryptor.final('utf8');
  }

  generateTimestamp() {
    const dataAtual = new Date();
    const expiracao = new Date(dataAtual.getTime() + (60 * 60 * 1000));

    return expiracao.toISOString().replace(/-/ig, '/');
  }

  verifyExpired(timestamp) {
    const dataAtual = new Date();

    const timestampToken = new Date(timestamp);

    if (timestampToken < dataAtual) {
      throw new Error();
    }

    return true;
  }

  trataToken(token) {
    const separeTimestamp = token.split('-');

    const code = separeTimestamp[0];
    const timestamp = separeTimestamp[1].replaceAll('/', '-');

    return [code, timestamp];
  }
}

module.exports = { CryptData };
