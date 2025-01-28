import * as Tone from 'tone';

type BlockType = 'entry' | 'mapping' | 'output';

class Block {
  id: string; // Unique identifier for the block
  type: BlockType; // Type of the block (entry, mapping, or output)
  description: string; // Description of the block
  node: Tone.AudioNode | null; // Tone.js node (oscillator, filter, etc.)
  mappingFn: ((value: number) => number) | null; // Optional mapping function for mapping blocks

  constructor(
    id: string,
    type: BlockType,
    description: string,
    node: Tone.AudioNode | null = null,
    mappingFn: ((value: number) => number) | null = null
  ) {
    this.id = id;
    this.type = type;
    this.description = description;
    this.node = node;
    this.mappingFn = mappingFn;
  }

  /**
   * Connects this block to another block.
   * @param targetBlock The block to connect to.
   */
  connect(targetBlock: Block) {
    if (!this.node || !targetBlock.node) {
      console.warn(`Block ${this.id} or target block ${targetBlock.id} is missing a node.`);
      return;
    }
    this.node.connect(targetBlock.node);
  }

  /**
   * For output blocks, applies a sine wave modification or other transformations.
   * @param frequency The frequency of the sine wave to add.
   */
  addSineFunction(frequency: number) {
    if (this.type === 'output' && this.node instanceof Tone.Gain) {
      const sineOscillator = new Tone.Oscillator(frequency, 'sine').start();
      sineOscillator.connect(this.node);
    } else {
      console.warn('Sine function can only be added to output blocks.');
    }
  }

  /**
   * For entry blocks, starts the sound source if applicable.
   */
  start() {
    if (this.type === 'entry' && this.node instanceof Tone.Oscillator) {
      this.node.start();
    } else {
      console.warn('Start can only be called on entry blocks with a valid sound source.');
    }
  }

  /**
   * For entry blocks, stops the sound source if applicable.
   */
  stop() {
    if (this.type === 'entry' && this.node instanceof Tone.Oscillator) {
      this.node.stop();
    } else {
      console.warn('Stop can only be called on entry blocks with a valid sound source.');
    }
  }
}

export default Block;
