const express = require("express");

const {
    registerUser,
    loginUser
} = require('../controllers/authController');

const authenticateToken = require("../middleware/authMiddleware");

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

router.get("/profile", authenticateToken, (req, res) => {
    res.json({
        message: "You are authenticated",
        user: req.user
    });
});

module.exports = router;