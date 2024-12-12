'use client'
import React, { useState } from 'react';
import styles from '../../styles/DropdownMenu.module.css';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleMenu} className={styles.dropdownButton}>
        Outils
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <a href="#">Option 1</a>
          <a href="#">Option 2</a>
          <a href="#">Option 3</a>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
