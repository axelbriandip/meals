const express = require('express');

// router
const ordersRouter = express.Router();

// auth
const {
	protectSession,
	protectAdmin,
    protectOrdersOwners
} = require('../middlewares/auth.middleware');

// Controllers
const {
    createOrder,
    getOrders,
    orderCancelled,
    orderCompleted
} = require('../controllers/orders.controller');

// Middlewares 
const { orderExists } = require('../middlewares/orders.middleware');

const {
    createMealValidators
} = require('../middlewares/validators.middleware');

// Protecting endpoints
ordersRouter.use(protectSession);

ordersRouter.get('/me', getOrders);
ordersRouter.post('/', createOrder);
ordersRouter.patch('/:id', orderExists, protectOrdersOwners, orderCompleted);
ordersRouter.delete('/:id', orderExists, protectOrdersOwners, orderCancelled);

module.exports = { ordersRouter }; 