const express = require('express');

// router
const usersRouter = express.Router();

// Controllers
const {
    createUser,
    getOrders,
    login,
    getAnOrder,
    deleteUser,
    updateUser
} = require('../controllers/users.controller');

// Middlewares 
const { userExists } = require('../middlewares/users.middleware');
const { orderExists } = require('../middlewares/orders.middleware');

const {
	protectSession,
	protectUsersAccount,
	protectAdmin,
} = require('../middlewares/auth.middleware');

const {
	createUserValidators,
} = require('../middlewares/validators.middleware');

usersRouter.post('/signup', createUserValidators, createUser);
usersRouter.post('/login', login);

// Protecting endpoints
usersRouter.use(protectSession);

usersRouter.get('/orders', getOrders);
usersRouter.get('/orders/:id', orderExists, getAnOrder);
usersRouter.patch('/:id', userExists, protectUsersAccount, updateUser);
usersRouter.delete('/:id', userExists, protectUsersAccount, deleteUser);

module.exports = { usersRouter };