const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError.util');

const checkValidations = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const errorMessages = errors.array().map(err => err.msg);

		const message = errorMessages.join(' / ');

		return next(new AppError(message, 400));
	}

	next();
};

const createUserValidators = [
	body('name')
		.isString()
		.withMessage('Name must be a string')
		.notEmpty()
		.withMessage('Name cannot be empty')
		.isLength({ min: 2 })
		.withMessage('Name must be at least 2 characters'),
	body('email')
        .isEmail()
        .withMessage('Must provide a valid email'),
	body('password')
		.isString()
		.withMessage('Password must be a string')
		.notEmpty()
		.withMessage('Password cannot be empty')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters'),
	checkValidations
];

const createRestaurantValidators = [
	body('name')
		.isString()
		.withMessage('Name must be a string')
		.notEmpty()
		.withMessage('Name cannot be empty')
		.isLength({ min: 2 })
		.withMessage('Name must be at least 2 characters'),
	body('address')
		.isString()
		.withMessage('Address must be a string')
		.notEmpty()
		.withMessage('Address cannot be empty')
		.isLength({ min: 2 })
		.withMessage('Address must be at least 2 characters'),
	body('rating')
		.isNumeric()
		.withMessage('Rating must be a number'),
	checkValidations
];

const createMealValidators = [
	body('name')
		.isString()
		.withMessage('Name must be a string')
		.notEmpty()
		.withMessage('Name cannot be empty')
		.isLength({ min: 2 })
		.withMessage('Name must be at least 2 characters'),
	body('price')
		.isNumeric()
		.withMessage('Price must be numeric')
		.notEmpty()
		.withMessage('Price cannot be empty')
		.isLength({ min: 2 })
		.withMessage('Price must be at least 2 characters'),
	checkValidations
];

module.exports = {
	createUserValidators,
	createRestaurantValidators,
	createMealValidators
};