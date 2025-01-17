# ChatApp
* A feature-rich, real-time chat application designed to facilitate seamless communication
  between users. Built with modern web technologies, the app offers a responsive interface, robust backend services, and secure user authentication.

# Features
* Real-Time Messaging: Users can send and receive messages instantly.
* User Authentication: Secure sign-up and login using encrypted passwords.
* Responsive Design: Works across desktop and mobile devices.
* Typing Indicators: See when someone is typing a message.
* Message Threads: View and reply to specific messages in a thread.
* Push Notifications: Get notified about new messages when offline.
* Group Chats: Create and participate in group conversations.
* Media Sharing: Send images and other file types directly in chat.
* Profile Management: Customize your user profile with an avatar and personal details.

# Technologies Used
** Frontend

*    React.js: For building the user interface.
*    Stream Chat SDK: For managing real-time messaging functionality.
*    Axios: For making API requests.
*    CSS/SCSS: For styling the application.

** Backend

*   Node.js: Backend runtime environment.
*   Express.js: Web server framework.
*   Stream Chat API: Backend service for managing chat functionality.
*   Bcrypt: For securely hashing passwords.
*   Twilio: For sending SMS notifications.

* Database

*   MongoDB (Optional): To store user profiles, message history, and additional metadata.

# Getting Started
** Prerequisites

*   Node.js (v14+)
*   NPM or Yarn
*   MongoDB (optional, for persistent data storage)
*   Stream API account (for chat functionality)
*   Twilio account (optional, for SMS notifications)

# Git cloning
git clone https://github.com/Smolclin/ChatApp.git
cd ChatApp

# Set Up Environment Variables: Create a .env file in the root directory and add:
** npm install
* STREAM_API_KEY=your_stream_api_key
* STREAM_API_SECRET=your_stream_api_secret
* STREAM_APP_ID=your_stream_app_id
* TWILIO_ACCOUNT_SID=your_twilio_account_sid
* TWILIO_AUTH_TOKEN=your_twilio_auth_token
* TWILIO_MESSAGING_SERVICE_SID=your_messaging_service_sid

# Run the Backend Server:
* cd server
* node index.js

# Run the Frontend Application:
* cd client
* npm start

# Usage
* Navigate to http://localhost:3000 to access the application.
* Sign up or log in to start chatting with other users.
* Use group chat or individual messages as needed.
* Customize your profile from the settings page.

# Acknowledgements

*  Stream Chat
*   React.js
*   Node.js
*   Twilio

  # App Screenshot
  ![Screenshot from 2025-01-17 04-46-34](https://github.com/user-attachments/assets/09d182e1-9929-430a-89cf-57317cbc1869)

  
# Contact

** For questions or support, please contact:

*   Email: clinsmol10@gmail.com
*   GitHub: Smolclin
