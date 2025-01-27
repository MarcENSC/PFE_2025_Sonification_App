import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../styles/App.css';
import DropdownItemDescriptionExample from '@/components/sidebar/DropdownMenu';
import InfiniteCanvas from '@/components/Canva';
import ProjectMenu from '@/components/sidebar/Menu';
import Drawer from '@/components/sidebar/Tool_drawer/drawer';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // État du drawer

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen); // Basculer l'état du drawer
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="Sidebar">
          <DropdownItemDescriptionExample onSelectCategory={setSelectedCategory} />
          <ProjectMenu selectedCategory={selectedCategory} />
        </div>
        <InfiniteCanvas onAddClick={toggleDrawer} /> {/* Passage de la fonction */}
        <Drawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        titre="Sin" 
        id="mon-drawer" 
      >
        
      </Drawer>
      </div>
    </DndProvider>
  );
}

export default App;