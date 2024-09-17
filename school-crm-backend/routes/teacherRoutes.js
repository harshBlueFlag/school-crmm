const express = require('express');
const { getTeachers, createTeacher, updateTeacher, deleteTeacher } = require('../controllers/teacherController');
const router = express.Router();

router.get('/', getTeachers);
router.post('/', createTeacher);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

module.exports = router;
