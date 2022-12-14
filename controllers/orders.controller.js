// dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// models
const { Order } = require('../models/orders.model');
const { Meal } = require('../models/meals.model');
const { Restaurant } = require('../models/restaurants.model');

// utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const createOrder = catchAsync(async (req, res, next) => {
    const { quantity, mealId } = req.body;
    const { sessionUser } = req;

    // search meal
	const meal = await Meal.findOne({ where: { id: mealId }});

	// If meal doesn't exist..
	if (!meal) {
		return next(new AppError('Meal not found', 404));
	}

    const totalPrice = quantity * meal.price;

	const newOrder = await Order.create({
        mealId,
        userId: sessionUser.id,
        totalPrice,
        quantity
    });

	// 201 -> Success and a resource has been created
	res.status(201).json({
		status: 'success',
		data: { newOrder },
	});
});

const getOrders = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;

	const orders = await Order.findAll({
		where: { userId: sessionUser.id },
		include: {
			model: Meal,
			include: {
				model: Restaurant
			}
		}
	});

	res.status(200).json({
		status: 'success',
		data: { orders },
	});
});

const orderCompleted = catchAsync(async (req, res, next) => {
	const { order } = req;

	await order.update({ status: 'completed' });

	res.status(200).json({
		status: 'success',
		data: { order },
	});
});

const orderCancelled = catchAsync(async (req, res, next) => {
	const { order } = req;

	await order.update({ status: 'cancelled' });

	res.status(200).json({
		status: 'success',
		data: { order },
	});
});

module.exports = {
    createOrder,
    getOrders,
    orderCompleted,
    orderCancelled
};