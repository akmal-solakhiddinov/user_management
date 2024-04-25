const express = require('express');
const router = express.Router();
const { getAllUsers, signUp, login, deleteUser, updateUserStatus, verifyToken } = require('../controllers/userController');


router.get('/users', getAllUsers);
router.post('/signup', signUp);
router.post('/login', login);
router.post('/users/delete', deleteUser)
router.post('/users/update', updateUserStatus)


router.get('/user', verifyToken, (req, res) => {
    try {
        const user = req.user;

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;
