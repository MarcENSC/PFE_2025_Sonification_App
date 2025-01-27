'use client'
import Drawer from "@/components/sidebar/Tool_drawer/drawer"
import { useState } from "react";
const Test = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };



  return (
    <div>
      <button onClick={toggleDrawer}>Ouvrir le Drawer</button>
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
    <h2>Contenu du Drawer</h2>
    <p>Ceci est un exemple de contenu dans le drawer.</p>
  </Drawer>
    </div>

 
  )
}

export default Test