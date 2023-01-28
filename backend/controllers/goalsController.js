const asyncHandler = require('express-async-handler');

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({
        msg: "Get goals"
    })
})

// @desc Get goal
// @route GET /api/goals/:id
// @access Private
const getGoal = asyncHandler(async (req, res) => {
    res.status(200).json({
        msg: "Show"
    })
})

// @desc Set goal
// @route POST /api/goals/
// @access Private
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(422);
        throw new Error("Something went wrong.");
    }

    return res.status(200)
        .json({
            msg: "Created"
        })
})

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({
        msg: "Deleted"
    })
})

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({
        msg: "Updated"
    })
})

module.exports = {
    getGoals,
    getGoal,
    updateGoal,
    createGoal,
    deleteGoal
}