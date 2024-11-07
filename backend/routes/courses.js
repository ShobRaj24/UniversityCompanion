//backend/routes/courses.js
const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Create a course
router.post("/", courseController.createCourse);

// Get all courses
router.get("/", courseController.getCourses);

// Update a course
router.put("/:id", courseController.updateCourse);

// Delete a course
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
