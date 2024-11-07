//backend/controllers/courseController.js
const pool = require("../config/database");

// Create a new course
exports.createCourse = async (req, res) => {
  const { course_name, professor, start_date, end_date } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO courses (course_name, professor, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *",
      [course_name, professor, start_date, end_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error creating course" });
  }
};

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM courses");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching courses" });
  }
};

// Update a course by ID
exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { course_name, professor, start_date, end_date } = req.body;
  try {
    const result = await pool.query(
      "UPDATE courses SET course_name = $1, professor = $2, start_date = $3, end_date = $4 WHERE id = $5 RETURNING *",
      [course_name, professor, start_date, end_date, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error updating course" });
  }
};

// Delete a course by ID
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM courses WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error deleting course" });
  }
};
