const express = require("express");

const {
    registerUser,
    loginUser
} = require('../controllers/authController');

const router = express.Router(); 

router.get("/test", (req, res) => {
    res.json({
        message: "Authentication route is working",
    });
});

// Register route
router.post("/register", registerUser);
// Login route
router.post("/login", loginUser);

module.exports = router;