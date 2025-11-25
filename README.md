# Zeno – Valorant Stats Tracker

Zeno is a full-stack Valorant stats tracker built with **Node.js**, **Express**, **EJS**, and **MongoDB**.  
It fetches real-time player stats from the Valorant API and renders them in a clean, responsive interface.

This project demonstrates backend development, API integration, templating (EJS), and basic database usage — suitable for SDE internship–level software engineering.

---

## 🚀 Features

- Search Valorant players by **Riot ID + Tagline**
- Fetch and display:
  - Player profile details
  - Match history
  - Agents performance
  - Basic competitive stats
- Clean UI using **Bootstrap + EJS templates**
- Modular structure with **middlewares**, **models**, and **views**
- Secure configuration using environment variables

---

## 🛠 Tech Stack

**Backend:**  
- Node.js  
- Express.js  

**Frontend:**  
- EJS templating  
- Bootstrap 5  

**Database:**  
- MongoDB  
- Mongoose  

**Other:**  
- Axios (API calls)  
- dotenv (environment configuration)

---

## 📂 Project Structure

zeno/
├── app.js # Main Express server
├── passport-config.js # Passport setup
├── middlewares/ # Middleware handlers
├── models/ # Mongoose models
├── views/ # EJS templates (UI pages)
├── .env.example # Template for environment variables
├── .gitignore
├── package.json
└── README.md


## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/dhruv-motaval/zeno.git
cd zeno
```
2. Install dependencies
```bash
npm install
```
3. Create your .env file

Use the provided .env.example as a guide.
```
MONGODB_URI=your_mongodb_connection_string_here
SESSION_SECRET=your_random_session_secret
VALORANT_API_KEY=your_valorant_api_key_here
PORT=4000
```
4. Start the server
```bash
npm start
```
```
Zeno will run at:

http://localhost:4000

🔧 Environment Variables

Your .env file must contain:

Key	Description
MONGODB_URI	MongoDB connection string
SESSION_SECRET	Secret key for sessions/auth
VALORANT_API_KEY	API key/token used to fetch Valorant stats
PORT	Port number (default: 4000)

Refer to .env.example for placeholders.
```
