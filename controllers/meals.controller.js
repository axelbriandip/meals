// encrypt and token
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// models
const { Meal } = require('../models/meals.model');
const { Restaurant } = require('../models/restaurants.model');

// utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllMealActive = catchAsync(async (req, res, next) => {
	const meals = await Meal.findAll({
		where: { status: 'active' }
	});

	res.status(200).json({
		status: 'success',
		data: { meals },
	});
});

const getAnMealActive = catchAsync(async (req, res, next) => {
    const { id } = req.params;

	const meal = await Meal.findOne({
		where: { id },
		include: { model: Restaurant }
	});

	res.status(200).json({
		status: 'success',
		data: { meal },
	});
});

const createMeal = catchAsync(async (req, res, next) => {
    const { name, price } = req.body;
    const { id } = req.params;

	const newMeal = await Meal.create({
		name,
        price,
        restaurantId: id
	});

	// 201 -> Success and a resource has been created
	res.status(201).json({
		status: 'success',
		data: { newMeal },
	});
});

const updateMeal = catchAsync(async (req, res, next) => {
    const { name, price } = req.body;
	const { meal } = req;

	await meal.update({ name, price });

	res.status(200).json({
		status: 'success',
		data: { meal },
	});
});

const deleteMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;

	// Soft delete
	await meal.update({ status: 'disabled' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
    deleteMeal,
    updateMeal,
    createMeal,
    getAnMealActive,
    getAllMealActive
};