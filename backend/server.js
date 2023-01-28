const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();

const {connectDB} = require('./config/db');
const {errorHandler} = require('./middlewares/errorMiddleware');
const protect = require('./middlewares/authMiddleware');

connectDB();

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT ?? DEFAULT_PORT;

const app = express();

app.use(express.json())

app.use('/api/v1/goals', protect, require('./routes/goalsRoute'))
app.use('/api/v1/users', require('./routes/userRoute'));

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`App listen port ${PORT}`);
});