// Model
const { Review } = require('../models/reviews.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const reviewExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const review = await Review.findOne({
		where: { id }
	});

	// If review doesn't exist..
	if (!review) {
		return next(new AppError('Review not found', 404));
	}

	req.review = review;
	next();
});

module.exports = {
	reviewExists
};