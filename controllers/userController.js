import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { generateToken } from './generateToken.js';
import jwt from 'jsonwebtoken';

const findOrCreateUser = async ({ sub, name, email, picture, password }) => {
    let user;
    let isNewUser = false;
    if (sub) {
        user = await User.findOne({ googlesubId: sub });
        if (!user && email) {

            user = await User.findOne({ email });
            if (!user) {
                // Create a new user
                user = new User({
                    username: name,
                    email,
                    googlesubId: sub,
                    picture,
                    password: password ? await bcrypt.hash(password, 10) : undefined
                });
                await user.save();
                isNewUser = true;
            }
        }
    } else if (email) {
        user = await User.findOne({ email });
        if (!user) {

            user = new User({
                username: name,
                email,
                password: password ? await bcrypt.hash(password, 10) : undefined
            });
            await user.save();
            isNewUser = true;
        }
    }
    return { user, isNewUser };
};

const authenticateUser = async (user, password) => {
    if (!user) {
        return { status: 400, message: 'User does not exist' };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return { status: 400, message: 'Invalid credentials' };
    }
    return { status: 200, user };
};

export const loginUser = async (req, res) => {
    const { sub, name, email, password, picture } = req.body;
    try {
        const { user, isNewUser } = await findOrCreateUser({ sub, name, email, picture, password });

        let authResult;
        if (isNewUser) {
            authResult = { status: 200, user };
        } else {
            authResult = email && password ? await authenticateUser(user, password) : { status: 200, user };
        }

        if (authResult.status === 400) {
            return res.status(authResult.status).json({ message: authResult.message });
        }
        const token = generateToken(authResult.user);
        console.log(token);
        res.status(200).json({
            message: 'User logged in',
            user: authResult.user,
            token
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};




export const logoutUser = (req, res) => {
    res.json({ success: true, message: 'Please discard your token' });
};




export const checkUser = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.json({
            loggedIn: true,
            user: decoded,
            sessionActive: true
        });
    });
};
