const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize')

class CustomerService{
  constructor(){}

  async find() {
    const res = await models.Customer.findAll({
      include: ['user']
    });
    return res;

  }

  async findOne(id) {
    const client = await models.Customer.findByPk(id);
    if(!client){
      throw boom.notFound('Customer not found');
    }
    return client;

  }

  async create(data) {
    // Es una forma de hacerlo
    // const newCustomer = await models.User.create(data.user)
    // const client = await models.Customer.create({
    //   ...data,
    //   userId: newUser.id
    // });

    // Esta es mediante la asociacion
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    })
    return newCustomer;

  }

  async update(id, changes) {
    const client = await this.findOne(id);
    const clientUpdate = await client.update(changes);
    return clientUpdate;
  }

  async delete(id) {
    const client = await this.findOne(id);
    const clientDelete = await client.destroy();
    return clientDelete;
  }


}
module.exports = CustomerService;
