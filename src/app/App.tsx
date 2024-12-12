import React from 'react';
import styles from '../styles/home.module.css';
import Canvas from '@/components/Canva';
import Sidebar from '@/components/sidebar/sidebar';

const Home = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Canvas />
    </div>
  );
};

export default Home;
