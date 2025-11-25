# ZENO – Valorant Stats & Guides Web Application

Zeno is a full-stack Valorant web application built with **Node.js**, **Express**, **EJS**, and **MongoDB**.  
It provides real-time player statistics, agent guides, weapon information, map insights, and pro-player settings — all in a clean, responsive interface.

This project demonstrates backend engineering, authentication, API integration, templating (EJS), database modeling, and structured full-stack development suitable for **SDE Intern positions**.

---

## 🚀 Features

### 🎮 Player Statistics
- Search players by **Riot ID + Tagline**
- View:
  - Player card & profile info
  - Match history
  - Agent performance
  - Competitive rank & stats

### 🏆 Leaderboard
- Global/Regional leaderboard page
- Displays top-performing players
- Clean UI optimized for quick browsing

### 🗺 Maps Section
- Detailed Valorant maps pages
- Location callouts & layout images

### 🔫 Weapons Section
- Weapon stats (damage, fire rate, recoil)
- Visual previews

### 📘 Guides Section
- Agent guides
- Ability explanations
- Lineups (example: Brimstone lineups)
- Tips for beginners & intermediate players

### ⚙️ Pro Player Settings
- Professional sensitivity
- DPI, keybinds, crosshair codes

### 🔐 Authentication (Basic)
- Middleware structure ready for auth handling
- Passport configuration included

### 📦 Modular Architecture
- `middlewares/`  
- `models/`  
- `views/public/...`  
- `github/workflows/` CI structure

Clean, scalable project layout following proper MVC patterns.

### 🔑 Environment Variable Support
- `.env.example` included
- Secrets are safely ignored via `.gitignore`

---

## 🛠 Tech Stack

### **Backend**
- Node.js  
- Express.js  

### **Frontend**
- EJS templating  
- Bootstrap 5  

### **Database**
- MongoDB  
- Mongoose models

### **Other**
- Axios (API requests)
- Passport.js (authentication config)
- dotenv (environment variables)
- GitHub Workflows (CI)

---

## 📁 Project Structure

```text
zeno/
├── app.js                      # Main Express server
├── passport-config.js          # Passport setup
│
├── middlewares/
│   ├── auth.js                 # Authentication middleware
│   └── ...                     # Other middleware handlers
│
├── models/
│   ├── User.js                 # User model
│   ├── Setting.js              # Pro settings model
│   ├── Leaderboard.js          # Leaderboard entry model
│   └── ...                     # Other mongoose models
│
├── views/
│   ├── public/
│   │   ├── maps/               # Map pages
│   │   ├── weapons/            # Weapon pages
│   │   ├── player/             # Player stats pages
│   │   ├── guides/             # Agent guides & tips
│   │   ├── leaderboard/        # Leaderboard UI
│   │   └── assets/             # Images & static data
│   ├── partials/               # Reusable components
│   └── layouts/                # Page templates
│
├── .github/
│   └── workflows/              # CI workflow configurations
│
├── .env.example                # Environment variable template
├── .gitignore                  
├── package.json
└── README.md

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/dhruv-motaval/zeno.git
cd zeno
```
### 2. Install dependencies
```bash
npm install
```
### 3. Create your .env file

Use the provided .env.example as a guide.
```
MONGODB_URI=your_mongodb_connection_string_here
SESSION_SECRET=your_random_session_secret
VALORANT_API_KEY=your_valorant_api_key_here
PORT=4000
```
### 4. Start the server
```bash
npm start
```
Zeno will run at:
```bash
http://localhost:4000
```
🔧 Environment Variables

Your .env file must contain:
```
Key	Description
MONGODB_URI	MongoDB connection string
SESSION_SECRET	Secret key for sessions/auth
VALORANT_API_KEY	API key/token used to fetch Valorant stats
PORT	Port number (default: 4000)
```
Refer to .env.example for placeholders.
