import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

// Define types for courses (optional, but recommended for type safety)
interface Course {
  id: number;
  name: string;
}

export default function Courses() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]); // State to store the courses
  const [error, setError] = useState<string>(""); // State to store error message

  // Function to fetch all courses
  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/courses"); // Backend API URL
      const data = await response.json(); // Parse response to JSON
      setCourses(data); // Store the courses in state
    } catch (err) {
      setError("Error fetching courses"); // Handle errors
      console.error(err); // Log the error to console
    }
  };

  // Function to handle "Get Course" by ID
  const getCourse = async (courseId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/courses/${courseId}`
      );
      const data = await response.json();
      console.log(data); // You can display or store the specific course data as needed
    } catch (err) {
      setError("Error fetching the course details");
      console.error(err);
    }
  };

  // Function to handle "Update Course" by ID
  const updateCourse = async (courseId: number, updatedData: any) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/courses/${courseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      const data = await response.json();
      console.log(data); // Updated course data
      fetchCourses(); // Refresh courses list after update
    } catch (err) {
      setError("Error updating the course");
      console.error(err);
    }
  };

  // Function to handle "Delete Course" by ID
  const deleteCourse = async (courseId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/courses/${courseId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data); // Deleted course data or confirmation message
      fetchCourses(); // Refresh courses list after deletion
    } catch (err) {
      setError("Error deleting the course");
      console.error(err);
    }
  };

  // Call fetchCourses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Courses Screen</Text>
      {error && <Text style={styles.error}>{error}</Text>}{" "}
      {/* Display error if there's one */}
      {courses.length === 0 ? (
        <Text>No courses available.</Text> // Display if no courses are fetched
      ) : (
        <View>
          {courses.map((course) => (
            <View key={course.id} style={styles.courseItem}>
              <Text style={styles.courseText}>{course.name}</Text>
              <Button
                title={`Get ${course.name}`}
                onPress={() => getCourse(course.id)}
              />
              <Button
                title={`Update ${course.name}`}
                onPress={() =>
                  updateCourse(course.id, { name: "Updated Name" })
                }
              />
              <Button
                title={`Delete ${course.name}`}
                onPress={() => deleteCourse(course.id)}
              />
            </View>
          ))}
        </View>
      )}
      <Button
        title="All Courses"
        onPress={fetchCourses} // Fetch all courses when the button is pressed
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
  courseItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    width: "80%",
  },
  courseText: {
    fontSize: 18,
  },
});
