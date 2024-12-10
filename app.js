require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/";

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
db.initialize(mongoUri);

// Routes

app.get("/", (req, res) => {
	res.send("Hello");
});
app.post("/api/restaurants", async (req, res) => {
	try {
		const newRestaurant = await db.addNewRestaurant(req.body);
		res.status(201).json(newRestaurant);
	} catch (error) {
		res.status(500).json({ message: "Failed to add restaurant" });
	}
});

app.get("/api/restaurants", async (req, res) => {
	const page = req.query.page ? parseInt(req.query.page) : null;
	const perPage = req.query.perPage ? parseInt(req.query.perPage) : null;
	const borough = req.query.borough;
	try {
		const restaurants = await db.getAllRestaurants(page, perPage, borough);
		res.json(restaurants);
	} catch (error) {
		console.error("Error fetching restaurants:", error);
		res.status(500).json({ message: "Failed to retrieve restaurants" });
	}
});

app.get("/api/restaurants/:id", async (req, res) => {
	try {
		const restaurant = await db.getRestaurantById(req.params.id);
		if (!restaurant) {
			return res.status(404).json({ message: "Restaurant not found" });
		}
		res.json(restaurant);
	} catch (error) {
		res.status(500).json({ message: "Failed to retrieve restaurant" });
	}
});

app.put("/api/restaurants/:id", async (req, res) => {
	try {
		const updatedRestaurant = await db.updateRestaurantById(
			req.body,
			req.params.id
		);
		if (!updatedRestaurant) {
			return res.status(404).json({ message: "Restaurant not found" });
		}
		res.json(updatedRestaurant);
	} catch (error) {
		res.status(500).json({ message: "Failed to update restaurant" });
	}
});

app.delete("/api/restaurants/:id", async (req, res) => {
	try {
		const deletedRestaurant = await db.deleteRestaurantById(req.params.id);
		if (!deletedRestaurant) {
			return res.status(404).json({ message: "Restaurant not found" });
		}
		res.status(204).end();
	} catch (error) {
		res.status(500).json({ message: "Failed to delete restaurant" });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
module.exports = app;
