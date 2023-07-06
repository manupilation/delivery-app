const { expect } = require('chai');
const sinon = require('sinon');
const { resetPasswordUserData, resetPassWithoutEmail, resetPassWithoutNewPass } = require('../mocks/resetPass');
const recoverPassController = require('../../app/controllers/resetPasswordController');
const recoverPassService = require('../../app/services/resetPasswordService');
const { userMock } = require('../mocks/Database');

describe('Tests resetPasswordController', function () {
  let token;
  describe('Tests if resetPassword has any problem', function () {
    afterEach(function () {
      sinon.restore();
    });


    it('User does not have email', async function () {
      const req = { body: { ...resetPassWithoutEmail, token } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(null);

      try {
        await recoverPassController.resetPassword(req, res);
      } catch (error) {
        console.log(error);
        expect(error.message).equal('Email is required');
      }
    });

    it('User does not have newPass', async function () {
      const req = { body: { ...resetPassWithoutNewPass, token } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(null);

      try {
        await recoverPassController.resetPassword(req, res);
      } catch (error) {
        expect(error.message).to.equal('New password is required');
      }
    });
  });

  describe('Tests if resetPassword flows smoothly', function () {
    it('Return ok', async function () {
      const req = { body: { ...resetPasswordUserData, token } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(null);
      const resetPassServiceStub = sinon.stub(recoverPassService, 'resetPassword').resolves(userMock);

      await recoverPassController.resetPassword(req, res);
      
      sinon.assert.calledWith(resetPassServiceStub, { ...resetPasswordUserData, token });
      expect((res.status).calledWith(201)).to.be.true;
      expect((res.json).calledWith('ok')).to.be.true;
    });
  });
});