import React from 'react';

interface PlayPauseControlProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const PlayPauseControl: React.FC<PlayPauseControlProps> = ({ isPlaying, onToggle }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        color: 'white',
        textAlign: 'center',
        fontSize: '18px',
      }}
      onClick={onToggle}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)')}
    >
      {isPlaying ? 'Pause' : 'Play'}
    </div>
  );
};

export default PlayPauseControl;
