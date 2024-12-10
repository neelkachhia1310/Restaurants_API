const mongoose = require("mongoose");
const Restaurant = require("./models/restaurant");

const db = {
	initialize: async (connectionString) => {
		try {
			await mongoose.connect(connectionString, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			console.log("Connected to MongoDB");
		} catch (error) {
			console.error("Failed to connect to MongoDB", error);
		}
	},

	addNewRestaurant: async (data) => {
		const restaurant = new Restaurant(data);
		return await restaurant.save();
	},

	getAllRestaurants: async (page, perPage, borough) => {
		const query = borough ? { borough } : {};
		if (!page || !perPage) {
			return await Restaurant.find(query).sort("name");
		}
		return await Restaurant.find(query)
			.sort("name")
			.skip((page - 1) * perPage)
			.limit(perPage);
	},

	getRestaurantById: async (id) => {
		return await Restaurant.findById(id);
	},

	updateRestaurantById: async (data, id) => {
		return await Restaurant.findByIdAndUpdate(id, data, { new: true });
	},

	deleteRestaurantById: async (id) => {
		return await Restaurant.findByIdAndDelete(id);
	},
};

module.exports = db;
