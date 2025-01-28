'use client';
import React, { useState, useEffect } from "react";
import '../../styles/variable_control.css';

interface ControlProps {
  onChangeFrequency: (frequency: number) => void; // Function to change the frequency
  frequency: number; // Current frequency value
}

function Control({ onChangeFrequency, frequency }: ControlProps) {
  // Update the slider's gradient based on frequency
  useEffect(() => {
    const slider = document.querySelector('.slider') as HTMLElement;
    if (slider) {
      const percentage = (frequency - 20) / (20000 - 20) * 100; // Normalize frequency
      slider.style.background = `linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(255, 255, 255) ${percentage}%, rgb(68,68,68) ${percentage}%, rgb(68,68,68) 100%)`;
    }
  }, [frequency]);

  return (
    <main className="container">
      <section className="sliderContainer">
        <p className="Text">Frequency</p>
        <input
          type="range"
          min={20} // Min frequency (20 Hz)
          max={20000} // Max frequency (20 kHz)
          step={1} // Step size (1 Hz)
          value={frequency} // Current frequency value from parent
          onChange={event => {
            onChangeFrequency(event.target.valueAsNumber); // Pass new frequency to parent
          }}
          className="slider"
        />
      </section>
      <section className="volumeText">
        <p>{frequency.toFixed(0)} Hz</p> {/* Display current frequency */}
      </section>
    </main>
  );
}

export default Control;
