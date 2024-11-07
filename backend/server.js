//backend/server.js

const express = require("express");
const pool = require("./config/database");
const courseRoutes = require("./routes/courses");
const assignmentRoutes = require("./routes/assignments");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Route to test server connection
app.get("/", (req, res) => {
  res.send("University Companion Backend is Running");
});

const cors = require("cors");

// Enable CORS
app.use(cors());

// Use routes for courses and assignments
app.use("/api/courses", courseRoutes);
app.use("/api/assignments", assignmentRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
