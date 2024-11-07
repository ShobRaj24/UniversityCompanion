import axios from "axios";

// For Android emulator, use '10.0.2.2' or your local machine's IP address if using a real device
const API_URL = "http://10.0.2.2:5000/api/courses"; // For Android Emulator
// const API_URL = 'http://192.168.x.x:5000/api/courses'; // Replace with your local machine's IP if on a physical device

export const getCourses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};
