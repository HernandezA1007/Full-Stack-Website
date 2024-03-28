// Antonio Hernandez
// INF 656
// Muvva
// 11 - 25 - 23

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const path = require("path");
// const { logger } = require("./middleware/logEvents");
// const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/users");
const shopItemRoutes = require("./routes/shopItems");
require("dotenv").config();

// 
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
// mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Connected to MongoDB Atlast"))
//     .catch((error) => console.error("MongoDB connection error:", error));

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

// module.exports = connectDB;
connectDB(); 


// Routes
app.get("/", (req, res) => {
    res.send("Hello from the PC Builder backend server");
});
app.use("/api/users", userRoutes);
app.use("/api/shop-items", shopItemRoutes); // shop-items or shopItems?

// mongoose connection..?
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
})

// Start the server..
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
