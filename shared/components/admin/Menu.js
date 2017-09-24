import React from 'react';
import Link from 'react-router-dom/Link';
import adminStyles from 'screens/admin.css';

const Menu = () => (
  <ul className={adminStyles.menu}>
    <li>
      <Link to="/admin">Home</Link>
    </li>
    <li>
      <Link to="/admin/logout">Logout</Link>
    </li>
  </ul>
);

export default Menu;
