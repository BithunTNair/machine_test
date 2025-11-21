const USERS = require('../../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const existingUser = await USERS.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User is already exist" })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await USERS.create({ fullName, email, password: hashPassword });
        return res.status(200).json({ message: 'user registration successful', newUser })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'something went wrong' })
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await USERS.findOne({ email });
        if (!userData) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }
        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign(
            { userId: userData._id, email: userData.email },
            secretKey,
            { expiresIn: "1d" }
        );
        return res.status(200).json({ message: 'Login successful', token: token, user: userData })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'something went wrong' })
    }
}
module.exports = { signup, login }