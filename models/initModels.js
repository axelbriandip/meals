// Models
const { Meal } = require('./meals.model');
const { Order } = require('./orders.model');
const { Restaurant } = require('./restaurants.model');
const { Review } = require('./reviews.model');
const { User } = require('./users.model');

const initModels = () => {
    // 1 Restaurant <-> M Review
	Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
	Review.belongsTo(Restaurant);
    // M Review <-> 1 User
	User.hasMany(Review, { foreignKey: 'userId' });
	Review.belongsTo(User);
    // 1 User <-> M Order
	User.hasMany(Order, { foreignKey: 'userId' });
	Order.belongsTo(User);
    // 1 Order <-> 1 Meal
	Meal.belongsTo(Order, { foreignKey: 'mealId' });
	Order.belongsTo(Meal);
    // M Meal <-> 1 Restaurant
	Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
	Meal.belongsTo(Restaurant);
};

module.exports = { initModels };