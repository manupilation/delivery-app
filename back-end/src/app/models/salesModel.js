const { Sales, Products } = require('../../database/models');
const salesProductsModel = require('./salesproductsModel');
const userModel = require('./userModel');

module.exports = {
  async createSale(obj, products) {
    const sale = await Sales.create({
      ...obj,
      saleDate: Date.now(),
    });

    const newProducts = await products.map((product) => ({
      saleId: sale.id,
      ...product,
    }));

    await salesProductsModel.create(newProducts);

    return sale;
  },

  async getSales(id) {
    const sales = await Sales.findAll({
      where: { userId: id },
      raw: true,
    });

    return sales;
  },

  async getSale(id) {
    const sale = await Sales.findOne({
      where: { id },
      include: [{
        model: Products,
        as: 'products',
        through: {
          attributes: ['quantity'],
          as: 'productQuantity',
        },
      }],
    });

    const seller = await userModel.getById(sale.sellerId);
    return { ...sale.dataValues, sellerName: seller.name };
  },
};
