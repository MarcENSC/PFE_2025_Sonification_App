import React, { useState, useEffect } from 'react';
import audioEngine from '../Sound/audioEngine'; // Central audio engine

interface SineWaveControlProps {
  id: string;
  oscillator: OscillatorNode; // Pass the created oscillator
}

const SineWaveControl: React.FC<SineWaveControlProps> = ({ id, oscillator }) => {
  const [frequency, setFrequency] = useState(440); // Default frequency 440Hz (A4 note)

  // Update the frequency of the oscillator whenever the slider changes
  useEffect(() => {
    audioEngine.setFrequency(oscillator, frequency);
  }, [frequency, oscillator]);

  return (
    <div className="sine-wave-control">
      <label>Frequency: {frequency} Hz</label>
      <input
        type="range"
        min={20}
        max={2000}
        step={1}
        value={frequency}
        onChange={(e) => setFrequency(Number(e.target.value))}
        className="slider"
      />
    </div>
  );
};

export default SineWaveControl;
