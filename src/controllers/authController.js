const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, programId } = req.body;

    if (!fullName || !email || !password || !programId) {
      return res.status(400).json({
        message: "Full name, email, password and program are required"
      });
    }

    const existingStudent = await pool.query(
      "SELECT id FROM students WHERE email = $1",
      [email]
    );

    if (existingStudent.rows.length > 0) {
      return res.status(409).json({
        message: "A student with this email already exists"
      });
    }

    const program = await pool.query(
      "SELECT id, name FROM programs WHERE id = $1",
      [programId]
    );

    if (program.rows.length === 0) {
      return res.status(404).json({
        message: "Selected program does not exist"
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

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


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Find student by email
    const result = await pool.query(
      `SELECT
        students.id,
        students.full_name,
        students.email,
        students.password,
        students.program_id,
        programs.name AS program_name
       FROM students
       JOIN programs
       ON students.program_id = programs.id
       WHERE students.email = $1`,
      [email]
    );

    // Check if student exists
    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const student = result.rows[0];

    // Compare password
    const passwordMatch = await bcrypt.compare(
      password,
      student.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        studentId: student.id,
        email: student.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      student: {
        id: student.id,
        fullName: student.full_name,
        email: student.email,
        program: student.program_name
      }
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error while logging in"
    });
  }
};


module.exports = {
  registerUser,
  loginUser
};