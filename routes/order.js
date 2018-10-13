const express = require('express');
const router = express.Router();
var Order = require('../models/order');
const checkAuth = require('../middleware/check-auth');

/** order api
 * order's CRUD operations
 */

// get all orders
router.get('/', checkAuth, (req, res) => {
  Order.find()
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// GET orders by user id
router.get('/:userId', checkAuth, (req, res) => {
  Order.find({ 'user': req.params.userId })
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

// create order
router.post('/', checkAuth, (req, res) => {
  const order = new Order(req.body);
  order.save()
    .then(order => {
      res.status(201).json(order);
    })
    .catch(error => {
      res.status(400).send(error);
    })
});

// update order
router.put('/:id', checkAuth, (req, res) => {
  Order.findByIdAndUpdate(req.params.id, {
    $set: { numNights: req.body.numNights }
  },{
    new: true
  }).then(order => {
      res.status(200).json(order);
    })
    .catch(error => {
      res.status(400).send(error);
    })
});

// delete order by id
router.delete('/:id', checkAuth, (req, res) => {
  Order.deleteOne({'_id': req.params.id})
    .then(order => {
      res.status(204).json(order);
    })
    .catch(error => {
      res.status(400).send(error);
    })
});

module.exports = router;
