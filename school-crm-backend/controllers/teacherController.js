const Teacher = require('../models/Teacher');

// Get all teachers
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new teacher
const createTeacher = async (req, res) => {
  const { name, gender, dob, contactDetails, salary, assignedClass } = req.body;

  // Validation to ensure all required fields are present
  if (!name || !gender || !dob || !contactDetails || !salary) {
    return res.status(400).json({ message: 'Please fill out all required fields: name, gender, dob, contact details, and salary.' });
  }

  const newTeacher = new Teacher({ name, gender, dob, contactDetails, salary, assignedClass });

  try {
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a teacher
const updateTeacher = async (req, res) => {
  const { name, gender, dob, contactDetails, salary, assignedClass } = req.body;

  // Validation to ensure all required fields are present during update
  if (!name || !gender || !dob || !contactDetails || !salary) {
    return res.status(400).json({ message: 'Please fill out all required fields for updating the teacher.' });
  }

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a teacher
const deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTeachers, createTeacher, updateTeacher, deleteTeacher };
