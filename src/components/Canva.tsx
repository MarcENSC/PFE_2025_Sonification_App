import React, { useRef, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import BoxInCanvas from "./Canvas/component";
import * as Tone from 'tone';
import PlayPauseControl from './Sound/Sound_control';

const InfiniteCanvas = ({ onAddClick }: { onAddClick: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // State to manage the canvas zoom and position
  const [transform, setTransform] = useState({ scale: 1, translateX: 0, translateY: 0 });

  // State for managing the items dropped on the canvas, including their Tone.Synth
  const [droppedItems, setDroppedItems] = useState<
    {
      id: string;
      x: number;
      y: number;
      title: string;
      icon: string;
      description: string;
      synth: Tone.Synth;
      isPlaying: boolean; // Whether the component is playing
    }[]
  >([]);

  // Play/pause state for all sounds
  const [isPlaying, setIsPlaying] = useState(false);

  // Start Tone.js audio context
  useEffect(() => {
    const startAudio = () => {
      Tone.start();
      console.log("Audio started");
    };
    window.addEventListener("click", startAudio);
    return () => window.removeEventListener("click", startAudio);
  }, []);

  // Handle play/pause toggle
  const handleTogglePlayPause = () => {
    setIsPlaying((prev) => !prev);
    if (isPlaying) {
      // Stop all sounds if paused
      droppedItems.forEach(item => {
        item.synth.triggerRelease();
      });
    } else {
      // Start all sounds if playing
      droppedItems.forEach(item => {
        item.synth.triggerAttack("C4"); // Or choose any starting note
      });
    }
  };

  // Handle dropping an item onto the canvas
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BOX",
    drop: (item, monitor) => {
      const rect = containerRef.current!.getBoundingClientRect();
      const dropX = ((monitor.getClientOffset()!.x - rect.left) / rect.width) * 100;
      const dropY = ((monitor.getClientOffset()!.y - rect.top) / rect.height) * 100;

      const synth = new Tone.Synth().toDestination();
      synth.triggerAttack("C4");  // Start sound immediately after drop
      setDroppedItems((prev) => [
        ...prev,
        {
          id: item.id || Date.now().toString(),
          x: dropX,
          y: dropY,
          title: item.title,
          icon: item.icon,
          description: item.description,
          synth,
          isPlaying: isPlaying, // Set the initial playing state
        },
      ]);
      return { name: "InfiniteCanvas" };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      className="infiniteCanvasWrapper"
      ref={drop}
      style={{
        width: "calc(100vw - 40px)",
        height: "calc(100vh - 40px)",
        margin: "5px",
        border: "2px solid rgb(44, 43, 43)",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "rgb(24, 24, 24)",
      }}
    >
      {/* Play/Pause Control Button */}
      <PlayPauseControl isPlaying={isPlaying} onToggle={handleTogglePlayPause} />

      <div
        ref={containerRef}
        style={{
          width: "200%",
          height: "200%",
          transform: `translate(${transform.translateX}px, ${transform.translateY}px) scale(${transform.scale})`,
          transformOrigin: "0 0",
          position: "absolute",
        }}
      >
        {droppedItems.map((item) => (
          <div
            key={item.id}
            style={{
              position: "absolute",
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <BoxInCanvas
              title={item.title}
              icon={item.icon}
              description={item.description}
              id={item.id}
              synth={item.synth}
              onAddClick={onAddClick}
              isPlaying={isPlaying} // Pass play state to child component
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCanvas;
