const express = require('express');

// router
const mealsRouter = express.Router();

// auth
const {
	protectSession,
	protectUsersAccount,
	protectAdmin,
} = require('../middlewares/auth.middleware');

// Controllers
const {
    createMeal,
    deleteMeal,
    getAllMealActive,
    getAnMealActive,
    updateMeal
} = require('../controllers/meals.controller');

// Middlewares 
const { mealExists } = require('../middlewares/meals.middleware');

const {
    createMealValidators
} = require('../middlewares/validators.middleware');

mealsRouter.get('/', getAllMealActive); // all meals
mealsRouter.get('/:id', mealExists, getAnMealActive); // get an meal

// Protecting endpoints
mealsRouter.use(protectSession);

mealsRouter.post('/:id', createMeal); // create meal
mealsRouter.patch('/:id', updateMeal); // update meal
mealsRouter.delete('/:id', deleteMeal); // disabled meal

module.exports = { mealsRouter };