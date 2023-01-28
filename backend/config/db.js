const mongoose = require('mongoose');

const user = process.env.MONGO_USER;
const url = process.env.MONGO_URL;
const password = process.env.MONGO_PASSWORD;
const db = process.env.MONGO_DB;

const connectionURL = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority`

mongoose.set('strictQuery', true);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(connectionURL);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = {
    connectDB
}