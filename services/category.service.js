const boom = require('@hapi/boom');
const { models }  = require('../libs/sequelize')

class CategoryService {

  constructor(){
  }
  async create(data) {
    const mewCategory = await models.Category.create(data)
    return mewCategory;
  }

  async find() {
    const category = await models.Category.findAll();
    return category;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, { include: ['product'] });
    return category;
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

}

module.exports = CategoryService;
