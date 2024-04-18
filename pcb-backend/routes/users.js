const express = require("express");
const User = require("../model/User");
const router = express.Router();


// RESTful APIs
/* Should all be moved to Controller file */

// GET /api/users - get all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// POST /api/users/register - create a new user
// router.post("/register", (req, res) => {
//     const user = new User(req.body);
//     user.save((err, user) => {
//         if (err) {
//             return res.status(400).send(err);
//         }
//         res.status(200).send(user);
//     });
// });

// router.post("/register", async (req, res) => {
//     try {
//         const newUser = new User(req.body);
//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });

    try {
      await newUser.save();
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
})

// Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user && user.password === password) {
      res.status(200).json({ message: "Logged in successfully!" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
});

// This works for backend testing
// router.post('/', async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         const newUser = new User({ username, email, password });
//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// GET /api/users/:id - get a specific user
router.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// PUT /api/users/:id - update a specific user
router.put('/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// DELETE /api/users/:id - delete a specific user
router.delete('/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});


module.exports = router;