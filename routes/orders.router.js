const express = require('express');

const OrderService = require('../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { 	getOrderSchema, createOrderSchema, addItemSchema} = require('./../schemas/order.schema');

const router = express.Router();

const servie = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const order = await servie.find();
    return res.json(order);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await servie.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder= await servie.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  // validatorHandler(getUserSchema, 'params'),
  // validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const order = await servie.update(id, body);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  // validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await servie.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

// ITEM
router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem= await servie.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
