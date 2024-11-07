//backend/controllers/assignmentController.js
const pool = require("../config/database");

// Create a new assignment
exports.createAssignment = async (req, res) => {
  const { course_id, title, due_date, status } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO assignments (course_id, title, due_date, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [course_id, title, due_date, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error creating assignment" });
  }
};

// Get all assignments for a course
exports.getAllAssignments = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM assignments");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching assignments" });
  }
};

// Get single assignments for a course
exports.getAssignmentsByCourse = async (req, res) => {
  const { course_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM assignments WHERE course_id = $1",
      [course_id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching assignments" });
  }
};

// Update an assignment by ID
exports.updateAssignment = async (req, res) => {
  const { id } = req.params;
  const { title, due_date, status } = req.body;
  try {
    const result = await pool.query(
      "UPDATE assignments SET title = $1, due_date = $2, status = $3 WHERE id = $4 RETURNING *",
      [title, due_date, status, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error updating assignment" });
  }
};

// Delete an assignment by ID
exports.deleteAssignment = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM assignments WHERE id = $1", [
      id,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    res.status(204).send(); // Success, no content
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: "Error deleting assignment" });
  }
};
