import User from '../models/user.js';
import bcrypt from 'bcrypt';

const findOrCreateUser = async ({ sub, name, email, picture, password }) => {
    let user;
    let isNewUser = false;

    // Check for Google sign-in with `sub`
    if (sub) {
        user = await User.findOne({ googlesubId: sub });
        if (!user && email) {
            // If no user found by `sub`, check by email and create if necessary
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
                isNewUser = true; // Mark as new user
            }
        }
    } else if (email) {
        // For non-Google sign-in, find by email
        user = await User.findOne({ email });
        if (!user) {
            // Create a new user if not found by email
            user = new User({
                username: name,
                email,
                password: password ? await bcrypt.hash(password, 10) : undefined
            });
            await user.save();
            isNewUser = true; // Mark as new user
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
        console.log(user);

        // Directly set authResult for new users
        let authResult;
        if (isNewUser) {
            authResult = { status: 200, user };
        } else {
            authResult = email && password ? await authenticateUser(user, password) : { status: 200, user };
        }
        console.log(authResult);

        if (authResult.status === 400) {
            return res.status(authResult.status).json({ message: authResult.message });
        }

        req.session.user = {
            id: authResult.user._id,
            name: authResult.user.username,
            email: authResult.user.email,
            picture: authResult.user.picture || ""
        };
        req.session.isAuthenticated = true;
        console.log(req.session);

        res.status(200).json({
            message: 'User logged in and session created',
            user: req.session.user,
            isAuthenticated: req.session.isAuthenticated,
            picture: req.session.user.picture
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.json({ success: true });
    });
};

export const checkUser = (req, res) => {
    if (req.session && req.session.user) {
        res.json({ loggedIn: true, user: req.session.user, sessionActive: true });
    } else {
        res.json({ loggedIn: false, sessionActive: false });
    }
};
