const productModel = require("../../app/models/productModel");
const productService = require("../../app/services/productService");
const { expect } = require("chai");
const sinon = require("sinon");

describe('Tests productService', () => {
  describe('Tests getAll method', () => {
    const productMock = {
      name: 'testProduct',
      price: 2.2,
      urlImg: 'testUrl',
    };

    it('Return an array with all products', async () => {
      const getAllStub = sinon.stub(productModel, 'getAll').resolves([productMock]);
      const products = await productService.getAll();

      sinon.assert.calledWith(getAllStub, { raw: true });
      expect(products).to.be.a('array');
      expect(products).to.be.deep.equal([productMock]);
    })
  })
})