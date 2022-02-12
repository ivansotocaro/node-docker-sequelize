const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { Order, OrderSchema } = require('./order.model');
const { OderProductSchema, OrderProduct } = require('./order-product.model');



function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize))
  OrderProduct.init(OderProductSchema, OrderProduct.config(sequelize))

  // Uno a Uno
  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
  // Uno a Mucho
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
  // OrderProduct.associate(sequelize.models);
}

module.exports = setupModels;
