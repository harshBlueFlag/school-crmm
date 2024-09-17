import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import ClassManagementPage from './pages/ClassManagementPage';
import TeacherProfilePage from './pages/TeacherProfilePage';
import StudentProfilePage from './pages/StudentProfilePage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="layout">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/classes" element={<ClassManagementPage />} />
              <Route path="/teachers" element={<TeacherProfilePage />} />
              <Route path="/students" element={<StudentProfilePage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
