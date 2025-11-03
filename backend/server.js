const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// ✅ Middleware
app.use(express.json());

// ✅ Proper CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",               // Local development
      "https://crimetrack-mern-app-axqw.vercel.app", // Deployed frontend
      "https://crimetrack-mern-app.onrender.com/"
    ], // Frontend URL
    
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/crimes', require('./routes/crimes'));

// ✅ Root route
app.get('/', (req, res) => {
  res.json({ message: 'CrimeTrack API is running locally 🚀' });
});

// ✅ Server port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
