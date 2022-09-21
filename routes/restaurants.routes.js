const express = require('express');

// router
const restaurantsRouter = express.Router();

// Controllers
const {
    getAllRestaurants,
	getAnRestaurant,
	createRestaurant
} = require('../controllers/restaurants.controller');

// Middlewares 
const { restaurantExists } = require('../middlewares/restaurants.middleware');

const {
	protectSession,
	protectUsersAccount,
	protectAdmin,
} = require('../middlewares/auth.middleware');

const {
	createRestaurantValidators
} = require('../middlewares/validators.middleware');

restaurantsRouter.get('/', getAllRestaurants); // obtener todos rest
restaurantsRouter.get('/:id', restaurantExists, getAnRestaurant); // obtener 1 rest

// Protecting endpoints
restaurantsRouter.use(protectSession);

restaurantsRouter.post('/', createRestaurantValidators, createRestaurant); // crear rest 
// restaurantsRouter.patch('/:id', getAnOrder); // actualizar rest
// restaurantsRouter.delete('/:id', userExists, protectUsersAccount, deleteUser); // desabilitar rest
// restaurantsRouter.post('/reviews/:id', userExists, protectUsersAccount, updateUser); // crear reseña
// restaurantsRouter.delete('/reviews/:id', userExists, protectUsersAccount, deleteUser); // eliminar reseña

module.exports = { restaurantsRouter };