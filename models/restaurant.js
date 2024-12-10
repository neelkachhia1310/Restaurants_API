const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
	name: String,
	cuisine: String,
	borough: String,
	address: String,
	phone: String,
	rating: Number,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
