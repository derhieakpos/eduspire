const bcrypt = require("bcryptjs");
const pool = require("../config/database");

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, programId } = req.body;

        // Check that all required fields were provided
        if (!fullName || !email || !password || !programId) {
            return res.status(400).json({
                message: "Full name, email, password and program are required"
            });
        }

        // Check if the email already exists
        const existingStudent = await pool.query(
            "SELECT id FROM students WHERE email = $1",
            [email]
        );

        if (existingStudent.rows.length > 0) {
            return res.status(409).json({
                message: "A student with this email already exists"
            });
        }

        // Check that the selected program exists
        const program = await pool.query(
            "SELECT id, name FROM programs WHERE id = $1",
            [programId]
        );

        if (program.rows.length === 0) {
            return res.status(404).json({
                message: "Selected program does not exist"
            });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the student
        const newStudent = await pool.query(
            `INSERT INTO students 
       (full_name, email, password, program_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, full_name, email, program_id, created_at`,
            [fullName, email, hashedPassword, programId]
        );

        return res.status(201).json({
            message: "Student registered successfully",
            student: newStudent.rows[0]
        });

    } catch (error) {
        console.error("Registration error:", error);

        return res.status(500).json({
            message: "Server error while registering student"
        });
    }
};

module.exports = {
    registerUser
};