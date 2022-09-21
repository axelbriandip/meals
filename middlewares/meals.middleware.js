// Model
const { Meal } = require('../models/meals.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const mealExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const meal = await Meal.findOne({ where: { id }});

	// If meal doesn't exist..
	if (!meal) {
		return next(new AppError('Meal not found', 404));
	}

	req.meal = meal;
	next();
});

module.exports = {
	mealExists,
};