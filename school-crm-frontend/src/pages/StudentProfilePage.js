import React, { useState, useEffect } from 'react';
import { getStudents, createStudent, deleteStudent } from '../services/apiService';
import Form from '../components/Form';
import Table from '../components/Table';

const StudentProfilePage = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', gender: '', dob: '', contactDetails: '', feesPaid: false });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.gender || !newStudent.dob || !newStudent.contactDetails) {
      alert('Please fill out all required fields before submitting.');
      return;
    }

    try {
      await createStudent(newStudent);
      alert('Student created successfully!');
      setNewStudent({ name: '', gender: '', dob: '', contactDetails: '', feesPaid: false });
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    fetchStudents();
  };

  const handleChange = (e, name) => {
    setNewStudent({ ...newStudent, [name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setNewStudent({ ...newStudent, feesPaid: e.target.checked });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Student Management</h2>
      <Form
        inputs={[
          { label: 'Name', type: 'text', value: newStudent.name, name: 'name' },
          { label: 'Gender', type: 'text', value: newStudent.gender, name: 'gender' },
          { label: 'Date of Birth', type: 'date', value: newStudent.dob, name: 'dob' },
          { label: 'Contact Details', type: 'text', value: newStudent.contactDetails, name: 'contactDetails' },
          { label: 'Fees Paid', type: 'checkbox', value: newStudent.feesPaid, name: 'feesPaid' }
        ]}
        handleChange={handleChange}
        handleCheckboxChange={handleCheckboxChange}
        handleSubmit={handleCreate}
      />
      <Table
        columns={['Name', 'Gender', 'Date of Birth', 'Contact Details', 'Fees Paid']}
        data={students.map(student => ({
          name: student.name,
          gender: student.gender,
          dob: student.dob,
          contactDetails: student.contactDetails,
          feesPaid: student.feesPaid ? 'Yes' : 'No'
        }))}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default StudentProfilePage;
