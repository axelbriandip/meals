const express = require('express');

// router
const ordersRouter = express.Router();

// auth
const {
	protectSession,
	protectUsersAccount,
	protectAdmin,
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

ordersRouter.get('/me', getOrders); // get orders of session user
ordersRouter.post('/', createOrder); // create order
ordersRouter.patch('/:id', orderCompleted); // order completed
ordersRouter.delete('/:id', orderCancelled); // order cancelled

module.exports = { ordersRouter };