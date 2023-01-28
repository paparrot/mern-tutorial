const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
        name: {
            type: String,
            required: [true, "Add user name"],
        },
        email: {
            type: String,
            required: [true, "Add user email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Add user password"],
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema);