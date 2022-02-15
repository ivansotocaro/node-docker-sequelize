const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize')
const bcrypt = require('bcrypt');
// const getConnection = require('../libs/postgres');
// const pool = require('../libs/postgres.pool')

class UserService {
  constructor() {
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));

  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
    return newUser;
    // const user = await models.User.create(data)
    // return user;
  }

  // async find() {
  //   const client = await getConnection();
  //   const res = await client.query('SELECT * FROM tasks');
  //   return res.rows;
  // }

  // POOL CONNECTION
  // async find() {
  //   const query = 'SELECT * FROM tasks';
  //   const res = await pool.query(query)
  //   return res.rows;
  // }

  // SEQUELIZE
  async find() {
    const users = await models.User.findAll({ include: ['customer']});
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const userUpdate = await user.update(changes);
    return userUpdate;
  }

  async delete(id) {
    const user = await this.findOne(id);
    const userDestroy = await user.destroy();
    return userDestroy;
  }
}

module.exports = UserService;
