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
		include: {
			model: Review,
			required: false,
			where: { status: 'active' }
		}
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
		include: {
			model: Review,
			required: false,
			where: { status: 'active' }
		}
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

const updateRestaurant = catchAsync(async (req, res, next) => {
	const { name, address } = req.body;
	const { restaurant } = req;

	await restaurant.update({ name, address });

	res.status(200).json({
		status: 'success',
		data: { restaurant },
	});
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
	const { restaurant } = req;

	// Soft delete
	await restaurant.update({ status: 'disabled' });

	res.status(204).json({ status: 'success' });
});

const createReview = catchAsync(async (req, res, next) => {
    const { comment, rating } = req.body;
    const { sessionUser } = req;
    const { id } = req.params;

	const newReview = await Review.create({
        userId: sessionUser.id,
        comment,
        rating,
        restaurantId: id
    });

	// 201 -> Success and a resource has been created
	res.status(201).json({
		status: 'success',
		data: { newReview }
	});
});

const updateReview = catchAsync(async (req, res, next) => {
	const { comment, rating } = req.body;
	const { review } = req;

	await review.update({ comment, rating });

	res.status(200).json({
		status: 'success',
		data: { review },
	});
});

const deleteReview = catchAsync(async (req, res, next) => {
	const { review } = req;

	// Soft delete
	await review.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
    getAllRestaurants,
    getAnRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    createReview,
    updateReview,
    deleteReview
};