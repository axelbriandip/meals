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
	updateReview,
	deleteReview
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

restaurantsRouter.post('/', createRestaurantValidators, createRestaurant);
restaurantsRouter.patch('/:id', protectAdmin, restaurantExists, updateRestaurant);
restaurantsRouter.delete('/:id', protectAdmin, restaurantExists, deleteRestaurant);
restaurantsRouter.post('/reviews/:id', protectAdmin, restaurantExists, createReview);
restaurantsRouter.patch('/reviews/:id', protectAdmin, reviewExists, protectUsersAccount, reviewExists, updateReview);
restaurantsRouter.delete('/reviews/:id', protectAdmin, reviewExists, protectUsersAccount, reviewExists, deleteReview);

module.exports = { restaurantsRouter };