const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
    exports.register = async (req, res) => {
        try {
            // 1. Check for existing user
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }

            // 2. Hash the Password (using existing middleware, so no new code here)

            // 3. Create new user
            const newUser = new User({
                email: req.body.email,
                password: req.body.password, // Already hashed due to middleware 
                role: req.body.role
            });
            await newUser.save();

            // 4. For now, send simple success message
            res.status(201).json({ message: "User registered" });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    };
}

exports.login = async (req, res) => {
    exports.login = async (req, res) => {
        try {
            // 1. Find the user
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // 2. Compare the password
            const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // 3. Create a JWT (We'll cover JWT creation shortly)  
            const token = generateJWT(user._id);

            // 4. Send a success response (with token)
            res.status(200).json({ token });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    };

    // Helper Function to Generate JWT (We'll define this next)
    function generateJWT(userId) {
        const payload = { id: userId };
        const secret = process.env.JWT_SECRET; // We'll set up this environment variable soon
        const options = { expiresIn: '1h' }; // Token expires in 1 hour

        return jwt.sign(payload, secret, options);
    }
}
