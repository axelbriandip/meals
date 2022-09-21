const express = require('express');

// router
const restaurantsRouter = express.Router();

// Controllers
const {
    getAllRestaurants,
	getAnRestaurant,
	createRestaurant,
	updateRestaurant,
	deleteRestaurant,
	createReview,
	updateReview
} = require('../controllers/restaurants.controller');

// Middlewares 
const { restaurantExists } = require('../middlewares/restaurants.middleware');
const { reviewExists } = require('../middlewares/reviews.middleware');

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
restaurantsRouter.patch('/:id', protectAdmin, restaurantExists, updateRestaurant); // actualizar rest
restaurantsRouter.delete('/:id', protectAdmin, restaurantExists, deleteRestaurant); // desabilitar rest
restaurantsRouter.post('/reviews/:id', restaurantExists, createReview); // crear reseña
restaurantsRouter.patch('/reviews/:id', reviewExists, protectUsersAccount, reviewExists,updateReview); // actualizar reseña
// restaurantsRouter.delete('/reviews/:id', userExists, protectUsersAccount, deleteUser); // eliminar reseña

module.exports = { restaurantsRouter };