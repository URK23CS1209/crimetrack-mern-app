# 🚔 CrimeTrack - Digital Crime Investigation Management System

![GitHub last commit](https://img.shields.io/github/last-commit/URK23CS1209/crimetrack-mern-app)
![GitHub repo size](https://img.shields.io/github/repo-size/URK23CS1209/crimetrack-mern-app)
![GitHub stars](https://img.shields.io/github/stars/URK23CS1209/crimetrack-mern-app?style=social)

A full-stack MERN application for managing crime investigations with advanced features like data visualization, search, and export capabilities.

## 🌟 Features

- 🔐 **User Authentication** - Secure login/signup with JWT
- 📊 **Crime Management** - Add, edit, delete, and track crimes
- 🔍 **Advanced Search** - Filter crimes by multiple criteria
- 📈 **Data Visualization** - Interactive charts and statistics
- 📥 **Export Capabilities** - Download crime data as CSV/PDF
- 👥 **User Management** - Admin dashboard for user control
- 📱 **Responsive Design** - Works on desktop and mobile

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Context API for state management
- Chart.js for data visualization
- CSS3 for styling

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/URK23CS1209/crimetrack-mern-app.git
cd crimetrack-mern-app
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Set up environment variables**

Create a `.env` file in the `backend` folder:
```env
MONGODB_URI=mongodb://localhost:27017/crimetrack
JWT_SECRET=your_secret_key_here
PORT=5000
```

4. **Start the application**

From the root directory:
```bash
npm start
```

This will start both backend (port 5000) and frontend (port 3000) concurrently.

5. **Open your browser**
```
http://localhost:3000
```

## 📸 Screenshots

*(Add screenshots of your application here)*

## 🎯 Available Scripts

### `npm start`
Runs both backend and frontend in development mode.

### Backend
- **`cd backend && npm start`** - Starts the Express server on port 5000
- MongoDB connection required

### Frontend
- **`cd frontend && npm start`** - Starts React app on port 3000
- **`npm test`** - Launches the test runner
- **`npm run build`** - Creates production build

## 📁 Project Structure
```
crimetrack-mern-app/
├── backend/
│   ├── config/          # Database configuration
│   ├── middleware/      # Authentication middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── server.js        # Express server
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Auth context
│   │   ├── utils/       # API utilities
│   │   └── App.js
│   └── package.json
├── package.json         # Root package (concurrently scripts)
└── README.md
```

## 🔐 Default Credentials

For testing purposes, you can create an admin account through the signup page.

## 🎨 Features in Detail

### Authentication
- User registration with validation
- Secure login with JWT tokens
- Password encryption using bcrypt
- Protected routes

### Crime Management
- Create new crime records with details
- Update existing records
- Delete crimes (admin only)
- View crime history and details

### Dashboard
- Visual statistics with charts
- Crime trends over time
- Status distribution
- Recent activity feed

### Advanced Search
- Search by crime type
- Filter by status (Open, In Progress, Closed)
- Date range filtering
- Location-based search

## 👥 Authors

- **URK23CS1209** - [GitHub Profile](https://github.com/URK23CS1209)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built as part of Web Technology course project
- Create React App for frontend scaffolding
- MongoDB for database
- Express.js for backend framework

## 🐛 Known Issues

- Some npm audit warnings in development dependencies (safe to ignore)
- MongoDB deprecation warnings (cosmetic, no functionality impact)

## 📞 Support

For issues or questions, please open an issue in the GitHub repository.

---

⭐ **Star this repository if you find it helpful!**

Made with ❤️ for digital crime investigation management
