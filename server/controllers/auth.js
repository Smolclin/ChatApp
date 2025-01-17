const { StreamChat } = require('stream-chat');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
    try {
        const { fullName, username, password, phoneNumber } = req.body;

        if (!fullName || !username || !password || !phoneNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userId = crypto.randomBytes(16).toString('hex');

        // Initialize StreamChat client instance
        const serverClient = StreamChat.getInstance(api_key, api_secret);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Use serverClient to create the user token
        const token = serverClient.createToken(userId); // Use createToken instead of generateServerToken
        
        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Initialize StreamChat client instance
        const client = StreamChat.getInstance(api_key, api_secret);

        const { users } = await client.queryUsers({ name: username });

        if (!users.length) {
            return res.status(400).json({ message: 'User not found' });
        }

        const hashedPassword = users[0].hashedPassword;
        if (!hashedPassword) {
            return res.status(500).json({ message: 'No password stored for this user' });
        }

        const success = await bcrypt.compare(password, hashedPassword);

        if (success) {
            const token = client.createToken(users[0].id); // Use createToken instead of generateServerToken
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id });
        } else {
            res.status(500).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { signup, login };