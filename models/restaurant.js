/********************************************************************************* * 
 * ITE5315 – Project 
 * * I declare that this assignment is my own work in accordance with Humber Academic Policy. 
 * * No part of this assignment has been copied manually or electronically from any other source 
 * * (including web sites) or distributed to other students.
 *  
 * * * Name:  Neel Kachhia & Abdun Nayeem Khan  Student ID: N01609700 & N01608790

Date: 10th December 2024* 
*/

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
