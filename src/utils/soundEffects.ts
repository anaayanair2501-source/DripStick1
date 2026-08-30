// Web Audio API Synthesizer for rich, non-blocking dessert sound effects
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Silky liquid dip sound
  public playDip() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.28);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Audio error ignored safely
    }
  }

  // Crispy waffle crunch sound
  public playCrunch() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      // White noise buffer for crisp crunch
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.Q.setValueAtTime(3.0, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(now);
    } catch {
      // Audio error ignored safely
    }
  }

  // Melodic chime for cart additions
  public playChime() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.06);

        gain.gain.setValueAtTime(0.12, now + index * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.06 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + index * 0.06);
        osc.stop(now + index * 0.06 + 0.38);
      });
    } catch {
      // Audio error ignored safely
    }
  }

  // Playful pop bubble sound
  public playPop() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Audio error ignored safely
    }
  }

  // Celebratory winner success fanfare
  public playSuccess() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.07);

        gain.gain.setValueAtTime(0.15, now + index * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.07 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + index * 0.07);
        osc.stop(now + index * 0.07 + 0.5);
      });
    } catch {
      // Audio error ignored safely
    }
  }

  // Wheel spin click slow down sound effect (Pixabay 101152 sound emulation & playback)
  private wheelSpinTimeouts: number[] = [];
  private wheelAudio: HTMLAudioElement | null = null;

  public playWheelSpinClickSlowDown(durationMs: number = 3800) {
    this.stopWheelSpin();
    if (this.isMuted) return;

    // Optional: Attempt audio file playback if network allows
    try {
      if (typeof window !== 'undefined') {
        const audioUrl = 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=film-special-effects-wheel-spin-click-slow-down-101152.mp3';
        if (!this.wheelAudio) {
          this.wheelAudio = new Audio(audioUrl);
          this.wheelAudio.volume = 0.65;
        }
        this.wheelAudio.currentTime = 0;
        this.wheelAudio.play().catch(() => {
          // Audio autoplay / CORS fallback to Web Audio API synthesis
        });
      }
    } catch {
      // Fallback to synthesized clicks
    }

    // High-fidelity synthesized wheel ratchet clicks with authentic deceleration curve
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const singleClick = (pitch = 1800, volume = 0.28) => {
        if (this.isMuted) return;
        try {
          const currentCtx = this.getContext();
          if (!currentCtx) return;
          const t = currentCtx.currentTime;

          // 1. High frequency click transient
          const osc = currentCtx.createOscillator();
          const gain = currentCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(pitch, t);
          osc.frequency.exponentialRampToValueAtTime(300, t + 0.018);

          gain.gain.setValueAtTime(volume, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

          osc.connect(gain);
          gain.connect(currentCtx.destination);
          osc.start(t);
          osc.stop(t + 0.022);

          // 2. Mechanical wooden peg contact noise
          const bufferSize = Math.floor(currentCtx.sampleRate * 0.015);
          const buffer = currentCtx.createBuffer(1, bufferSize, currentCtx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
          }
          const noise = currentCtx.createBufferSource();
          noise.buffer = buffer;
          const filter = currentCtx.createBiquadFilter();
          filter.type = 'highpass';
          filter.frequency.setValueAtTime(1200, t);
          const noiseGain = currentCtx.createGain();
          noiseGain.gain.setValueAtTime(volume * 0.7, t);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.015);

          noise.connect(filter);
          filter.connect(noiseGain);
          noiseGain.connect(currentCtx.destination);
          noise.start(t);
        } catch {
          // Ignored
        }
      };

      // Generate timing delays replicating the physics of a spinning wheel slowing down
      let currentTime = 0;
      let interval = 28; // Start fast at 28ms between ratchet clicks

      while (currentTime < durationMs - 150) {
        const progress = currentTime / durationMs;
        // Cubic deceleration easing curve
        interval = 28 + Math.pow(progress, 2.6) * 520;
        
        const scheduledTime = currentTime;
        const currentPitch = 1900 - progress * 500 + (Math.random() * 80 - 40);
        const currentVol = Math.max(0.12, 0.32 * (1 - progress * 0.45));

        const timeoutId = window.setTimeout(() => {
          singleClick(currentPitch, currentVol);
        }, scheduledTime);

        this.wheelSpinTimeouts.push(timeoutId);
        currentTime += interval;
      }

      // Final settling click
      const finalTimeout = window.setTimeout(() => {
        singleClick(1400, 0.35);
      }, durationMs - 50);
      this.wheelSpinTimeouts.push(finalTimeout);

    } catch {
      // Audio error handled
    }
  }

  public stopWheelSpin() {
    this.wheelSpinTimeouts.forEach((id) => clearTimeout(id));
    this.wheelSpinTimeouts = [];
    if (this.wheelAudio) {
      try {
        this.wheelAudio.pause();
        this.wheelAudio.currentTime = 0;
      } catch {
        // Ignored
      }
    }
  }
}

export const soundEffects = new SoundEngine();
