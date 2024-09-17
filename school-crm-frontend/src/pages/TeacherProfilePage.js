import React, { useState, useEffect } from 'react';
import { getTeachers, createTeacher, deleteTeacher } from '../services/apiService';
import Form from '../components/Form';
import Table from '../components/Table';

const TeacherProfilePage = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ name: '', gender: '', dob: '', contactDetails: '', salary: '' });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const data = await getTeachers();
    setTeachers(data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.gender || !newTeacher.dob || !newTeacher.contactDetails || !newTeacher.salary) {
      alert('Please fill out all required fields before submitting.');
      return;
    }
    try {
      await createTeacher(newTeacher);
      fetchTeachers();
      setNewTeacher({ name: '', gender: '', dob: '', contactDetails: '', salary: '' });
    } catch (error) {
      console.error("Error creating teacher:", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteTeacher(id);
    fetchTeachers();
  };

  const handleChange = (e, name) => {
    setNewTeacher({ ...newTeacher, [name]: e.target.value });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Teacher Management</h2>
      <Form
        inputs={[
          { label: 'Name', type: 'text', value: newTeacher.name, name: 'name' },
          { label: 'Gender', type: 'text', value: newTeacher.gender, name: 'gender' },
          { label: 'Date of Birth', type: 'date', value: newTeacher.dob, name: 'dob' },
          { label: 'Contact Details', type: 'text', value: newTeacher.contactDetails, name: 'contactDetails' },
          { label: 'Salary', type: 'number', value: newTeacher.salary, name: 'salary' }
        ]}
        handleChange={handleChange}
        handleSubmit={handleCreate}
      />
      <Table
        columns={['Name', 'Gender', 'Date of Birth', 'Contact Details', 'Salary']}
        data={teachers.map(teacher => ({
          name: teacher.name,
          gender: teacher.gender,
          dob: teacher.dob,
          contactDetails: teacher.contactDetails,
          salary: teacher.salary
        }))}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default TeacherProfilePage;
