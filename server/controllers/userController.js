const User = require('../models/users.model');
const bcrypt = require('bcryptjs')
const generateJwtToken = require('../services/token');
const jwt = require('jsonwebtoken');

const tokenAuth = (req) => {
    const headerAuth = req.headers['authorization'];
    if (!headerAuth) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = headerAuth.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken || !decodedToken.email || !decodedToken.password) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

exports.getAllUsers = async (req, res) => {
    tokenAuth(req)

    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

exports.signUp = async (req, res) => {
    const { name, email, password, position } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = await User.create({ name, email, position, password: hashedPassword });

        const token = generateJwtToken(newUser);

        res.status(201).json({ status: 'Success', user: newUser, token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};


exports.deleteUser = async (req, res) => {
    tokenAuth(req)

    const { usersId } = req.body;

    try {
        if (!Array.isArray(usersId) || usersId.length === 0) {
            return res.status(400).json({ error: 'Invalid user IDs provided' });
        }

        await User.destroy({ where: { id: usersId } });

        res.status(200).json({ message: 'Users deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete users' });
    }
};

exports.updateUserStatus = async (req, res) => {
    tokenAuth(req)

    const { userStatus, usersId } = req.body;

    try {
        if (!Array.isArray(usersId) || usersId.length < 0) {
            return res.status(400).json({ error: 'Invalid user IDs or Status provided' });
        }

        for (let i = 0; i < usersId.length; i++) {
            const userId = usersId[i];

            const s = await User.update({ status: userStatus }, { where: { id: userId } });
        }

        res.status(200).json({ status: 'Success', message: 'User status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user status' });
    }
};



exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            throw new Error('User not found');
        }

        if (user.status === 'blocked') {
            throw new Error('blocked')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log(isPasswordValid);
            throw new Error('Invalid password');
        }

        await User.update({ lastLogin: user.regestrationTime, regestrationTime: new Date() }, { where: { email: email } })

        const token = generateJwtToken(user);
        res.status(200).json({ status: 'Success', user: user, token: token });
    } catch (error) {
        if (error.message === 'blocked') {
            res.status(401).json({ error: 'User account is blocked', userStatus: 'blocked' });
        } else {
            res.status(401).json({ error: 'Authentication failed' });
        }
        ;
    }
};


exports.verifyToken = async (req, res, next) => {
    try {
        const headerAuth = req.headers['authorization'];
        console.log(headerAuth);
        if (!headerAuth) {
            return res.status(401).json({ error: 'Authorization header is missing' });
        }

        const token = headerAuth.split(' ')[1];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken || !decodedToken.email) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const user = await User.findOne({ where: { email: decodedToken.email } });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ error: 'Token verification failed' });
    }
};


