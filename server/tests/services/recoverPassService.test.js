const { expect } = require('chai');
const sinon = require('sinon');
const recoverPassService = require('../../app/services/resetPasswordService');
const recoverPassModel = require('../../app/models/resetPasswordModel');
const { resetPasswordUserData, resetPassWithoutEmail } = require('../mocks/resetPass');
const { userMock } = require('../mocks/Database');

describe('Tests resetPasswordService', function () {
  describe('Tests if resetPassword has any problem', function () {
    afterEach(function () {
      sinon.restore();
    });

    beforeEach(function () {
    });

    it('User does not exist', async function () {
    });

    it('User token is expired', async function () {
    });

    it('User does not have a token', async function () {
    });
  });

  describe('Tests if resetPassword flows smoothly', function () {
    afterEach(function () {
    });

    beforeEach(function () {
    });

    it('resetPassword returns ok', async function () {
    });
  });
});