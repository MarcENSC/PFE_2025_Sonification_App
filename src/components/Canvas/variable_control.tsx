'use client';
import React, { useState, useEffect } from "react";
import '../../styles/variable_control.css';

function Control() {
  const [volume, setVolume] = useState(1);

  // Update the gradient based on the volume
  useEffect(() => {
    const slider = document.querySelector('.slider') as HTMLElement; // Assert the type as HTMLElement
    if (slider) {
      const percentage = volume * 100;
      // Mise à jour du dégradé avec blanc en tant que couleur de remplissage
      slider.style.background = `linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(255, 255, 255) ${percentage}%, rgb(68,68,68) ${percentage}%, rgb(68,68,68) 100%)`;
    }
  }, [volume]);

  return (
    <main className='container'>
      <section className='sliderContainer'>
        <p  className="Text">Frequency</p>
        <input
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={volume}
          onChange={event => {
            setVolume(event.target.valueAsNumber);
          }}
          className='slider'
        />
      </section>
      <section className='volumeText'>
        <p >{(volume * 100).toFixed(0)}%</p>
      </section>
    </main>
  );
}

export default Control;
