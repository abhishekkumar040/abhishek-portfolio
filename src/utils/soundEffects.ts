// Synthesized Web Audio API Sound Effects for Smooth Page Scrolling & Interactions

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private lastScrollY: number = 0;
  private scrollDistanceAccumulator: number = 0;
  private lastTickTime: number = 0;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Play subtle tactile tick when scrolling
  public playScrollTick(speedFactor: number = 1) {
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    const now = performance.now();
    if (now - this.lastTickTime < 45) return; // Debounce to keep sound pleasant and non-intrusive
    this.lastTickTime = now;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Gentle organic click / tick tone
      const baseFreq = 280 + Math.min(speedFactor * 15, 120);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.035);

      // Micro volume gain curve
      gain.gain.setValueAtTime(0.012, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch {
      // Ignore audio context autoplay restrictions gracefully
    }
  }

  // Play ambient harmonic chime when transitioning between main sections
  public playSectionChime() {
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    try {
      const notes = [440, 554.37, 659.25]; // A4 - C#5 - E4 harmonic triad
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.04);

        gain.gain.setValueAtTime(0.018, this.ctx.currentTime + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.04 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.04);
        osc.stop(this.ctx.currentTime + idx * 0.04 + 0.3);
      });
    } catch {
      // Ignore audio restrictions
    }
  }

  // Handle scroll events and trigger tick
  public handleScroll(scrollY: number) {
    const delta = Math.abs(scrollY - this.lastScrollY);
    this.lastScrollY = scrollY;

    this.scrollDistanceAccumulator += delta;

    // Trigger sound every 90px of scroll
    if (this.scrollDistanceAccumulator >= 90) {
      const speed = Math.min(delta / 10, 5);
      this.playScrollTick(speed);
      this.scrollDistanceAccumulator = 0;
    }
  }
}

export const soundEngine = new SoundEngine();
