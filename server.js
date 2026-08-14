const express = require('express');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

let students = [
    {
        id: 1,
        name: 'John Doe',
        age: 20,
        course: 'Computer Science'
    },
    {
        id: 2,
        name: 'Jane Smith',
        age: 22,
        course: 'Mathematics'
    },
    {
        id: 3,
        name: 'Alice Johnson',
        age: 21,
        course: 'Physics'
    },
    {
        id: 4,
        name: 'Bob Brown',
        age: 23,
        course: 'Chemistry'
    },
    {
        id: 5,
        name: 'Charlie Davis',
        age: 19,
        course: 'Biology'
    }
];

// GET endpoint to retrieve all students
app.get('/students', (req, res) => {
    res.json(students);
});

// GET endpoint to retrieve a student by ID
app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);

    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

//start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
