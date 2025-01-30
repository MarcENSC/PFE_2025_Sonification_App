import React, { useRef, useState, useEffect } from "react";
import { useDrop, useDrag } from "react-dnd";
import BoxInCanvas from "./Canvas/component";
import * as Tone from "tone";
import PlayPauseControl from "./Sound/Sound_control";

const InfiniteCanvas = ({ onAddClick }: { onAddClick: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [transform, setTransform] = useState({ scale: 1, translateX: 0, translateY: 0 });


  const [droppedItems, setDroppedItems] = useState<
    {
      id: string;
      x: number;
      y: number;
      title: string;
      icon: string;
      description: string;
      synth: Tone.Synth;
      isPlaying: boolean;
    }[]
  >([]);

 
  const [isPlaying, setIsPlaying] = useState(false);

 
  useEffect(() => {
    const startAudio = async () => {
      await Tone.start();
      console.log("Audio context started");
    };
    window.addEventListener("click", startAudio);
    return () => window.removeEventListener("click", startAudio);
  }, []);

  
  const handleTogglePlayPause = async () => {
    const newPlayingState = !isPlaying;
    

    await Tone.start();
    
    if (newPlayingState) {
      const now = Tone.now();
      droppedItems.forEach((item, index) => {

        const startTime = now + (index * 0.01);
        item.synth.triggerAttack("C4", startTime);
      });
    } else {
      droppedItems.forEach(item => {
        item.synth.triggerRelease("+0.01");
      });
    }
    
    setIsPlaying(newPlayingState);
  };

  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BOX",
    drop: (item: any, monitor) => {
      const rect = containerRef.current!.getBoundingClientRect();
      const dropX = ((monitor.getClientOffset()!.x - rect.left) / rect.width) * 100;
      const dropY = ((monitor.getClientOffset()!.y - rect.top) / rect.height) * 100;

      
      const synth = new Tone.Synth({
        oscillator: {
          type: "sine"
        },
        envelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.5,
          release: 0.1
        }
      }).toDestination();
      
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
          isPlaying: false,
        },
      ]);
      return { name: "InfiniteCanvas" };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));


  useEffect(() => {
    return () => {
      droppedItems.forEach((item) => {
        item.synth.dispose();
      });
    };
  }, [droppedItems]);

  
  
  
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const scaleFactor = e.deltaY < 0 ? 1.1 : 0.9;
        setTransform((prev) => ({
          ...prev,
          scale: prev.scale * scaleFactor,
        }));
      }
    };

    const container = containerRef.current;
    container?.addEventListener("wheel", handleWheel, { passive: false });
    return () => container?.removeEventListener("wheel", handleWheel);
  }, []);

  
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDraggingCanvas(true);
    setStartDragPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingCanvas) {
      const dx = e.clientX - startDragPos.x;
      const dy = e.clientY - startDragPos.y;
      setTransform((prev) => ({
        ...prev,
        translateX: prev.translateX + dx,
        translateY: prev.translateY + dy,
      }));
      setStartDragPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDraggingCanvas(false);
  };

 
  const moveItem = (id: string, newX: number, newY: number) => {
    setDroppedItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              x: newX,
              y: newY,
            }
          : item
      )
    );
  };

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
        cursor: isDraggingCanvas ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
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
              isPlaying={isPlaying}
              onMove={moveItem}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCanvas;