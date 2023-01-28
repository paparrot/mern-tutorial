const express = require('express');
const dotenv = require('dotenv').config();

const {errorHandler} = require('./middleware/errorMiddleware');

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT ?? DEFAULT_PORT;

const app = express();

app.use(express.json())

app.use('/api/v1/goals', require('./routes/goalsRoute'))

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`App listen port ${PORT}`);
});