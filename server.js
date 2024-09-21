const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
	.connect(
		"mongodb+srv://poonamtrifed:qQx9kXnIGhzCghxm@cluster0.a2lq9.mongodb.net/mernproject?retryWrites=true&w=majority&appName=Cluster0"
	)
	.then(() => console.log("Connected to MongoDB"))
	.catch((error) => console.error("Error connecting to MongoDB:", error));

//poonamtrifedqQx9kXnIGhzCghxm
//mongodb+srv://poonamtrifed:<db_password>@cluster0.a2lq9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// User Schema and Model
const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	age: { type: Number, required: true },
});

const User = mongoose.model("User", userSchema);

// Routes
app.get("/users", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ message: "Error fetching users" });
	}
});

app.post("/users", async (req, res) => {
	try {
		const { name, email, age } = req.body;
		const newUser = new User({ name, email, age });
		await newUser.save();
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({ message: "Error creating user" });
	}
});

// Server listen
app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
