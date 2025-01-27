import React, { useRef, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import BoxInCanvas from "./Canvas/component";

const InfiniteCanvas = ({ onAddClick }: { onAddClick: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Transform state for zooming and panning
  const [transform, setTransform] = useState({
    scale: 1,
    translateX: 0,
    translateY: 0,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState<{ x: number; y: number } | null>(null);

  const [droppedItems, setDroppedItems] = useState<
    {
      id: string;
      x: number; // Position in percentage
      y: number; // Position in percentage
      title: string;
      icon: string;
      description: string;
    }[]
  >([]);

  // Update canvas size on window resize
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        containerRef.current.style.width = `${window.innerWidth}px`;
        containerRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  // Handle dragging to pan the canvas
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && lastMousePosition) {
      const deltaX = e.clientX - lastMousePosition.x;
      const deltaY = e.clientY - lastMousePosition.y;

      setTransform((prev) => ({
        ...prev,
        translateX: prev.translateX + deltaX,
        translateY: prev.translateY + deltaY,
      }));

      setLastMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setLastMousePosition(null);
  };

  // Handle zooming
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomSpeed = 0.1;
    const newScale = Math.min(Math.max(0.5, transform.scale - e.deltaY * zoomSpeed * 0.01), 5);

    setTransform((prev) => ({
      ...prev,
      scale: newScale,
    }));
  };

  // Handle item dropping
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BOX",
    drop: (item, monitor) => {
      const rect = containerRef.current!.getBoundingClientRect();
      const dropX = ((monitor.getClientOffset()!.x - rect.left) / rect.width) * 100; // Position in percentage
      const dropY = ((monitor.getClientOffset()!.y - rect.top) / rect.height) * 100; // Position in percentage

      setDroppedItems((prev) => [
        ...prev,
        {
          id: item.id || Date.now().toString(),
          x: dropX,
          y: dropY,
          title: item.title,
          icon: item.icon,
          description: item.description,
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
      style={{
        width: "calc(100vw - 40px)", // Subtract margin (horizontal)
        height: "calc(100vh - 40px)", // Subtract margin (vertical)
        margin: "5px", // Margin around the canvas
        border: "2px solid rgb(44, 43, 43)", // Optional border for visibility
        borderRadius: "10px", // Rounded edges
        overflow: "hidden", // Ensure no overflow beyond the wrapper
        position: "relative",
        backgroundColor: "rgb(24, 24, 24)",
      }}
      ref={drop}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
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
              onAddClick={onAddClick} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCanvas;
