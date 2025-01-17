const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');

require('dotenv').config();
console.log("API Key:", process.env.STREAM_API_KEY);

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
    try {
        const { fullName, username, password, phoneNumber } = req.body;
        if (!fullName || !username || !password || !phoneNumber) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const userId = crypto.randomBytes(16).toString('hex');

        const serverClient = StreamChat.getInstance(api_key, api_secret);
        //connect(api_key, api_secret, app_id);
        const { StreamChat } = require('stream-chat');
        const { TokenManager } = require('stream-chat');

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(userId);
        
        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        const { users } = await client.queryUsers({ name: username });

        if(!users.length) {
            return res.status(400).json({ message: 'User not found' });
        }

        const hashedPassword = users[0].hashedPassword;
        if (!hashedPassword) {
            return res.status(500).json({ message: 'No password stored for this user' });
        }

        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id);

        if(success) {
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id});
        } else {
            res.status(500).json({ message: 'Incorrect password' });
        }
    } catch (error) {ads
        console.log(error);

        res.status(500).json({ message: error });
    }
};

module.exports = { signup, login }