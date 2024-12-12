import React from 'react';
import styles from '../../styles/Sidebar.module.css';
import DropdownMenu from './DropdownMenu';
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <h1>SoniKit</h1>
      </div>
      <div className={styles.search}>
        <input type="text" placeholder="Search components" />
      </div>
      <DropdownMenu />
    </div>
  );
};

export default Sidebar;
