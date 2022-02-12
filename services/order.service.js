const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {

  constructor(){
  }


  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    const newOrder = await models.Order.findAll();
    return newOrder;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }


  async addItem(data){
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }


}

module.exports = OrderService;
