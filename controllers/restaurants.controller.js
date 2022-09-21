// encrypt and token
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// models
const { Restaurant } = require('../models/restaurants.model');
const { Review } = require('../models/reviews.model');

// utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

// Gen random jwt signs
// require('crypto').randomBytes(64).toString('hex') -> Enter into the node console and paste the command

const getAllRestaurants = catchAsync(async (req, res, next) => {
	const restaurants = await Restaurant.findAll({
		where: { status: 'active' },
		include: { model: Review }
	});

	res.status(200).json({
		status: 'success',
		data: { restaurants }
	});
});

const getAnRestaurant = catchAsync(async (req, res, next) => {
    // const { sessionUser } = req;
    const { id } = req.params;

	const restaurant = await Restaurant.findOne({
		where: { id },
		include: { model: Review }
	});

	res.status(200).json({
		status: 'success',
		data: { restaurant },
	});
});

const createRestaurant = catchAsync(async (req, res, next) => {
	const { name, address, rating } = req.body;

	const newRestaurant = await Restaurant.create({
        name,
        address,
        rating
	});

	// 201 -> Success and a resource has been created
	res.status(201).json({
		status: 'success',
		data: { newRestaurant }
	});
});

module.exports = {
    getAllRestaurants,
    getAnRestaurant,
    createRestaurant
};