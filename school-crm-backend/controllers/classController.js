const Class = require('../models/Class');

// Get all classes
const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('teacher', 'name');  // Only get the teacher's name
    res.json(classes);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch classes' });
  }
};

// Create a new class
const createClass = async (req, res) => {
  const { className, year, teacher, studentFees } = req.body;
  const newClass = new Class({ className, year, teacher, studentFees });

  try {
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a class
const updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a class
const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete class' });
  }
};


module.exports = { getClasses, createClass, updateClass, deleteClass };