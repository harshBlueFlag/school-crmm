import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// **Class API**
export const getClasses = async () => {
  const response = await axios.get(`${API_URL}/classes`);
  return response.data;
};

export const createClass = async (newClass) => {
  const response = await axios.post(`${API_URL}/classes`, newClass);
  return response.data;
};

export const updateClass = async (id, updatedClass) => {
  const response = await axios.put(`${API_URL}/classes/${id}`, updatedClass);
  return response.data;
};

export const deleteClass = async (id) => {
  if (!id) {
    throw new Error("No ID provided for deletion");  // Ensure ID is provided
  }
  return await axios.delete(`${API_URL}/${id}`);  // Ensure the ID is appended
};

// **Teacher API**
export const getTeachers = async () => {
  const response = await axios.get(`${API_URL}/teachers`);
  return response.data;
};

export const createTeacher = async (newTeacher) => {
  const response = await axios.post(`${API_URL}/teachers`, newTeacher);
  return response.data;
};

export const updateTeacher = async (id, updatedTeacher) => {
  const response = await axios.put(`${API_URL}/teachers/${id}`, updatedTeacher);
  return response.data;
};

export const deleteTeacher = async (id) => {
  const response = await axios.delete(`${API_URL}/teachers/${id}`);
  return response.data;
};

// **Student API**
export const getStudents = async () => {
  const response = await axios.get(`${API_URL}/students`);
  return response.data;
};

export const createStudent = async (newStudent) => {
  const response = await axios.post(`${API_URL}/students`, newStudent);
  return response.data;
};

export const updateStudent = async (id, updatedStudent) => {
  const response = await axios.put(`${API_URL}/students/${id}`, updatedStudent);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await axios.delete(`${API_URL}/students/${id}`);
  return response.data;
};
