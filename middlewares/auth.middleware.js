// import jwt
const jwt = require('jsonwebtoken');

// import dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Model
const { User } = require('../models/users.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const protectSession = catchAsync(async (req, res, next) => {
	// Get token
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		// Extract token
		token = req.headers.authorization.split(' ')[1];
	}

	// Check if the token was sent or not
	if (!token) {
		return next(new AppError('The token was invalid', 403));
	}

	// Verify token
	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	// Verify the token's owner
	const user = await User.findOne({
		where: { id: decoded.id, status: 'active' },
	});

	if (!user) {
		return next( new AppError('The owner of the session is no longer active', 403) );
	}

	// access
	req.sessionUser = user;
	next();
});

const protectUsersAccount = (req, res, next) => {
	const { sessionUser, user } = req;

	if (sessionUser.id !== user.id) {
		return next(new AppError('You are not the owner of this account.', 403));
	}

	next();
};

const protectAdmin = (req, res, next) => {
	const { sessionUser } = req;

	if (sessionUser.role !== 'admin') {
		return next(new AppError('You do not have the right access level.', 403));
	}

	next();
};

module.exports = {
	protectSession,
	protectUsersAccount,
	protectAdmin
};