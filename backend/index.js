// Assignments CRUD endpoints

// Create Assignment
app.post("/api/assignments", async (req, res) => {
  const { course_id, title, due_date, status } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO assignments (course_id, title, due_date, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [course_id, title, due_date, status || "pending"]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve all assignments for a specific course
app.get("/api/assignments/:course_id", async (req, res) => {
  const { course_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM assignments WHERE course_id = $1",
      [course_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Assignment
app.put("/api/assignments/:id", async (req, res) => {
  const { id } = req.params;
  const { title, due_date, status } = req.body;
  try {
    const result = await pool.query(
      "UPDATE assignments SET title = $1, due_date = $2, status = $3 WHERE id = $4 RETURNING *",
      [title, due_date, status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Assignment
app.delete("/api/assignments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM assignments WHERE id = $1", [id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
