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

    }
];

// GET endpoint to retrieve all students
app.get('/students', (req, res) => {
    res.json(students);
});

//start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
