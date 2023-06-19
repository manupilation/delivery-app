const resetPasswordModel = require('../models/resetPasswordModel');
const { CryptData } = require('../utils/CryptData');
const cryptData = new CryptData();

module.exports = {
  async resetPassword({ token = '', newPass }) {
    try {
      if (token === '') throw new Error('Token not found');

      const decodeToken = cryptData.decryptString(token);

      const [code, timestamp] = cryptData.trataToken(decodeToken);

      verifyToken(timestamp);

      const resetPass = await resetPasswordModel.resetPassword({ email: code, newPass });

      return resetPass;

    } catch (err) {
      throw new Error('Token invalid or expired');
    }
  },

  async sendResetEmail(email, url) {
    const token = cryptData.encryptString(email);

    const sendEmail = await resetPasswordModel.sendResetEmail(email, url, token);

    return sendEmail;
  },
};
