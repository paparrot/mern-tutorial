const {Router} = require('express');
const {getGoals, getGoal, updateGoal, deleteGoal, createGoal} = require('../controllers/goalsController');

const router = Router();

router.route('/').get(getGoals).post(createGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal).get(getGoal)

module.exports = router;