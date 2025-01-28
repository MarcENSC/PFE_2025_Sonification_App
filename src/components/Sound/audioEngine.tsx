class AudioEngine {
    private audioContext: AudioContext;
    private oscillators: Map<string, OscillatorNode>;
  
    constructor() {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.oscillators = new Map();
    }
  
    // Create a sine wave oscillator and store it
    createSineWave(id: string, frequency: number): OscillatorNode {
      const oscillator = this.audioContext.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      oscillator.connect(this.audioContext.destination);
      oscillator.start();
      this.oscillators.set(id, oscillator);
  
      return oscillator;
    }
  
    // Stop and disconnect all oscillators
    stopAll() {
      this.oscillators.forEach((oscillator) => {
        oscillator.stop();
        oscillator.disconnect();
      });
      this.oscillators.clear();
    }
  
    // Set the frequency of a specific oscillator
    setFrequency(id: string, frequency: number) {
      const oscillator = this.oscillators.get(id);
      if (oscillator) {
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      }
    }
  }
  
  const audioEngine = new AudioEngine();
  export default audioEngine;
  