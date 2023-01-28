const {Router} = require('express');
const {registerUser, loginUser, getUserData} = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');

const router = Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUserData);

module.exports = router;