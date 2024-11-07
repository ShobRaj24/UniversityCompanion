//backend/models/databaseSetup.js
const pool = require("../config/database");

// SQL command to create the Courses table
const createCoursesTable = `
  CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    course_name TEXT NOT NULL,
    professor TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
  );
`;

// SQL command to create the Assignments table
const createAssignmentsTable = `
  CREATE TABLE IF NOT EXISTS assignments (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    due_date DATE NOT NULL,
    status TEXT CHECK (status IN ('pending', 'completed')) DEFAULT 'pending'
  );
`;

// Execute the SQL commands
const setupDatabase = async () => {
  try {
    await pool.query(createCoursesTable);
    await pool.query(createAssignmentsTable);
    console.log("Tables created successfully.");
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    pool.end(); // Close the pool connection after table setup
  }
};

setupDatabase();
