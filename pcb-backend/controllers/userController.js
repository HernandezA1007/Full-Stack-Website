const User = require("../model/User");

// Get all Users
const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) {
        return res.status(400).json({message: "No users found."})
    }
    res.json(users);
};

// Create a User


// Update a User


// Delete a User


// Get a User

