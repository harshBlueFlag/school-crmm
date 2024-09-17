import React, { useState, useEffect } from 'react';
import { getClasses, createClass, deleteClass } from '../services/apiService';

const ClassManagementPage = () => {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({ className: '', year: '', studentFees: '' });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const data = await getClasses();
    setClasses(data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newClass.className || !newClass.year || !newClass.studentFees) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      await createClass(newClass);
      fetchClasses();
      setNewClass({ className: '', year: '', studentFees: '' });
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      await deleteClass(id);
      fetchClasses();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const handleChange = (e, field) => {
    setNewClass({ ...newClass, [field]: e.target.value });
  };

  return (
    <div className="container">
      <h2>Class Management</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          value={newClass.className}
          onChange={(e) => handleChange(e, 'className')}
          placeholder="Class Name"
        />
        <input
          type="number"
          value={newClass.year}
          onChange={(e) => handleChange(e, 'year')}
          placeholder="Year"
        />
        <input
          type="number"
          value={newClass.studentFees}
          onChange={(e) => handleChange(e, 'studentFees')}
          placeholder="Student Fees"
        />
        <button type="submit" className="button">Submit</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Year</th>
            <th>Fees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map(cls => (
            <tr key={cls._id}>
              <td>{cls.className}</td>
              <td>{cls.year}</td>
              <td>{cls.studentFees}</td>
              <td>
                <button onClick={() => handleDelete(cls._id)} className="button button-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassManagementPage;
