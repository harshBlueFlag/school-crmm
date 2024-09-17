import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>School CRM</h2>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/classes">Classes</Link>
        <Link to="/teachers">Teachers</Link>
        <Link to="/students">Students</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
