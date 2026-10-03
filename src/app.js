const express = require('express');

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to the Student API' 
    });
});

app.use('/auth', authRoutes);

module.exports = app;