const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Register user
// @route POST /api/v1/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        res.status(422);
        throw new Error('Name, email and password is required.');
    }

    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(422);
        throw new Error("User already exists.");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        });
    } else {
        res.status(422);
        throw new Error('Invalid user data.');
    }

});

// @desc Authenticate a user
// @route POST /api/v1/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if (! email || ! password) {
        res.status(422);
        throw new Error('Email and password is required.')
    }

    const user = await User.findOne({email});
    if (! user) {
        res.status(404)
            throw new Error('User is not exists.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        });
    } else {
        console.log(123);
        res.status(404);
        throw new Error('Invalid credentials');
    }
});

// @desc Get user data
// @route GET /api/v1/users/me
// @access Private
const getUserData = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

// @desc Generate token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getUserData
}