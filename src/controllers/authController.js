const bycrypt = require("bycryptjs");

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        //1. validate input
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "Full name, email and password are required"
            });
        }

        //2. Basic password validation
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long."
            });
        }

        //3. Check if email already exists
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email.toLowerCase()]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                message: "Email already exists."
            });
        }

        //4. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //5. Save the user to the database
        const result = await pool.query(
            `INSERT INTO users 
            (full_name, email, password) 
            VALUES ($1, $2, $3) 
            RETURNING id, full_name, email, is_verified, created_at`,
            [
                fullName,
                email.toLowerCase(),
                hashedPassword
            ]
        );

        //6. Return newly created user
        return res.status(201).json({
            message: "User registered successfully.",
            user: result.rows[0]
        });
    } catch (error) {
        console.error("Error registering user:", error);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
};

//user login function

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //1. Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        //2. Find user by email
        const userResult = await pool.query(
            `SELECT * 
            FROM users 
            WHERE email = $1`,
            [email.toLowerCase()]
        );

        if (userResult.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const user = userResult.rows[0];

        //3. Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        //4. Generate JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        //5. Send response 
        return res.status(200).json({
            message: "Login successful.",
            token
        });
    } catch (error) {
        console.error("Error logging in user:", error);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};