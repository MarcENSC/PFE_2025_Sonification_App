'use client';
import React, { useState, useEffect } from "react";
import '../../styles/variable_control.css';

interface ControlProps {
  onChangeFrequency: (frequency: number) => void; 
  frequency: number; 
}

function Control({ onChangeFrequency, frequency }: ControlProps) {
  
  useEffect(() => {
    const slider = document.querySelector('.slider') as HTMLElement;
    if (slider) {
      const percentage = (frequency - 20) / (20000 - 20) * 100; 
      slider.style.background = `linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(255, 255, 255) ${percentage}%, rgb(68,68,68) ${percentage}%, rgb(68,68,68) 100%)`;
    }
  }, [frequency]);

  return (
    <main className="container">
      <section className="sliderContainer">
        <p className="Text">Frequency</p>
        <input
          type="range"
          min={20} 
          max={500} 
          step={1} 
          value={frequency} 
          onChange={event => {
            onChangeFrequency(event.target.valueAsNumber); 
          }}
          className="slider"
        />
      </section>
      <section className="volumeText">
        <p>{frequency.toFixed(0)} Hz</p> {}
      </section>
    </main>
  );
}

export default Control;
