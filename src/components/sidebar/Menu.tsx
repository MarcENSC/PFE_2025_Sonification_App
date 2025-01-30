import React from 'react';
import '../../styles/Menu.css';
import Box from './drag_boxes';

interface Project {
  name: string;
  icon: string;
  description: string;
  id?: string;
  category: string; // Ajoutez une propriété `category` pour filtrer les projets
}

interface ProjectMenuProps {
  selectedCategory: string | null; // `selectedCategory` peut être `null` ou une chaîne
}

const projects: Project[] = [
  {
    id: '1',
    name: 'Project 1',
    icon: '🎤',
    description: 'Pitch detector',
    category: 'Analyse',
  },
  {
    id: '2',
    name: 'Project 2',
    icon: '👷‍♂️',
    description: 'Structure project',
    category: 'Structure',
  },
  {
    id: '3',
    name: 'Project 3',
    icon: '🎵',
    description: 'sound file',
    category: 'Audio',
  },
  {
    id: '5',
    name: 'Project 5',
    icon: '🎙️',
    description: 'Audio recorder',
    category: 'Audio',
  },
  {
    id: '4',
    name: 'Project 4',
    icon: '∿',
    description: 'Sin function',
    category: 'Scripts',
  },
  {
    id: '5',
    name: 'Project 2',
    icon: '👷‍♂️',
    description: 'Structure project',
    category: 'Structure',
  },
  {
    id: '6',
    name: 'Project 2',
    icon: '👷‍♂️',
    description: 'Structure project',
    category: 'Structure',
  },
];

const ProjectMenu: React.FC<ProjectMenuProps> = ({ selectedCategory }) => {
  // Si aucune catégorie n'est sélectionnée, afficher un message par défaut
  if (!selectedCategory) {
    return (
      <div className="project-menu">
        <p className="default-message">Select a component</p>
      </div>
    );
  }

  // Filtrer les projets en fonction de la catégorie sélectionnée
  const filteredProjects = projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="project-menu">
      {filteredProjects.map((project) => (
        <Box
          key={project.id}
          title={project.name}
          icon={project.icon}
          description={project.description}
          id={project.id}
        />
      ))}
    </div>
  );
};

export default ProjectMenu;