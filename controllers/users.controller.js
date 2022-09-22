// encrypt and token
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// models
const { User } = require('../models/users.model');
const { Order } = require('../models/orders.model');
const { Restaurant } = require('../models/restaurants.model');
const { Meal } = require('../models/meals.model');

// utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

// Gen random jwt signs
// require('crypto').randomBytes(64).toString('hex') -> Enter into the node console and paste the command

// done
const getOrders = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;

	const users = await User.findOne({
		attributes: { exclude: ['password'] },
		where: { id: sessionUser.id },
		include: {
			model: Order,
			required: false, // outer join
			where: { status: 'active' },
			include: {
				model: Meal,
				include: {
					model: Restaurant
				}
			}
		}

	});

	res.status(200).json({
		status: 'success',
		data: { users },
	});
});

// done
const getAnOrder = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;
    const { id } = req.params;

	const users = await User.findOne({
		attributes: { exclude: ['password'] },
		where: { id: sessionUser.id },
		include: {
            model: Order,
            where: { id },
			include: {
				model: Meal,
				include: {
					model: Restaurant
				}
			}
        },
	});

	res.status(200).json({
		status: 'success',
		data: { users },
	});
});

// done
const createUser = catchAsync(async (req, res, next) => {
	const { name, email, password, role } = req.body;

	if (role !== 'admin' && role !== 'normal') {
		return next(new AppError('Invalid role', 400));
	}

	// Encrypt password
	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		name,
		email,
		password: hashedPassword,
		role
	});

	// Remove password from response
	newUser.password = undefined;

	// 201 -> Success and a resource has been created
	res.status(201).json({
		status: 'success',
		data: { newUser },
	});
});

const updateUser = catchAsync(async (req, res, next) => {
	const { name, email } = req.body;
	const { user } = req;

	await user.update({ name, email });

	res.status(200).json({
		status: 'success',
		data: { user },
	});
});

const deleteUser = catchAsync(async (req, res, next) => {
	const { user } = req;

	// Soft delete
	await user.update({ status: 'disabled' });

	res.status(204).json({ status: 'success' });
});

// done
const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate if user exist with given email
	const user = await User.findOne({
		where: {
            email,
            status: 'active'
        },
	});

	// Compare passwords
	// If user doesn't exists or passwords doesn't match..
	if (!user || !(await bcrypt.compare(password, user.password))) {
		return next(new AppError('Wrong credentials', 400));
	}

	// Remove password from response
	user.password = undefined;

	// Generate jwt
	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

	res.status(200).json({
		status: 'success',
		data: { user, token },
	});
});

module.exports = {
	getOrders,
	createUser,
	login,
    getAnOrder,
    updateUser,
    deleteUser
};