// Model
const { Restaurant } = require('../models/restaurants.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const restaurantExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const restaurant = await Restaurant.findOne({
		where: { id }
	});

	// If restaurant doesn't exist..
	if (!restaurant) {
		return next(new AppError('Restaurant not found', 404));
	}

	req.restaurant = restaurant;
	next();
});

module.exports = {
	restaurantExists
};