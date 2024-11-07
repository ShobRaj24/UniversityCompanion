//backend/routes/assignments.js

const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");

// Create an assignment
router.post("/", assignmentController.createAssignment);

// Get all assignments
router.get("/", assignmentController.getAllAssignments);

// Get single assignments for a course
router.get("/course/:course_id", assignmentController.getAssignmentsByCourse);

// Update an assignment
router.put("/:id", assignmentController.updateAssignment);

// Delete an assignment
router.delete("/:id", assignmentController.deleteAssignment);

module.exports = router;
