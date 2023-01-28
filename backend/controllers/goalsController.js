const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find();

    res.status(200).json({goals});
})

// @desc Get goal
// @route GET /api/goals/:id
// @access Private
const getGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (! goal) {
        res.status(404);
        throw new Error('Goal not found.');
    }

    return res.status(200).json({goal})
})

// @desc Set goal
// @route POST /api/goals/
// @access Private
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(422);
        throw new Error("Something went wrong.");
    }

    const goal = await Goal.create({
        text: req.body.text
    });

    return res.status(200).json({goal});
})

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const goal = await Goal.findById(id);

    if (! goal) {
        res.status(404);
        throw new Error('Goal not found');
    }

    await Goal.findByIdAndDelete(id)

    res.status(200).send({
        message: "Successfully deleted"
    })
})

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    if (! req.body.text) {
        res.status(422);
        throw new Error('Text field required.');
    }

    const id = req.params.id;

    const goal = await Goal.findById(id);

    if (! goal) {
        res.status(404);
        throw new Error("Goal not found.");
    }

    const updateGoal = await Goal.findByIdAndUpdate(id, {
        text: req.body.text
    }, {
        new: true
    });

    res.status(200).send(updateGoal);
})

module.exports = {
    getGoals,
    getGoal,
    updateGoal,
    createGoal,
    deleteGoal
}