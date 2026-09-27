import { useState, useEffect } from 'react';

// Primary & High-availability Fallback Audio Streams (Metro Boomin / Trap Instrumental Vibe)
const AUDIO_SOURCES = [
  'https://cdn.pixabay.com/download/audio/2022/11/06/audio_27d759d5b7.mp3',
  'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
  'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c800b65a.mp3',
  'https://upload.wikimedia.org/wikipedia/commons/2/23/Trap_Beat_Instrumental.ogg',
];

class BackgroundMusicManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private currentSourceIndex = 0;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private hasInitialized = false;

  public init() {
    if (this.hasInitialized || typeof window === 'undefined') return;
    this.hasInitialized = true;

    this.createAudioInstance(this.currentSourceIndex);

    // Global listeners for instant unlock on first user gesture or entry
    const unlockAutoplay = () => {
      if (this.audio) {
        this.audio.play().then(() => {
          this.setPlaying(true);
        }).catch(() => {});
      }
    };

    const options = { once: true, capture: true };
    window.addEventListener('click', unlockAutoplay, options);
    window.addEventListener('touchstart', unlockAutoplay, options);
    window.addEventListener('scroll', unlockAutoplay, options);
    window.addEventListener('pointermove', unlockAutoplay, options);
    window.addEventListener('keydown', unlockAutoplay, options);
  }

  private createAudioInstance(index: number) {
    if (index >= AUDIO_SOURCES.length) return;

    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }

    const audio = new Audio(AUDIO_SOURCES[index]);
    audio.loop = true;
    audio.volume = 0.35;
    audio.crossOrigin = 'anonymous';

    audio.onerror = () => {
      console.warn(`Audio stream ${index} failed to load, attempting fallback...`);
      if (index + 1 < AUDIO_SOURCES.length) {
        this.currentSourceIndex = index + 1;
        this.createAudioInstance(this.currentSourceIndex);
        if (this.isPlaying) {
          this.audio?.play().catch(() => {});
        }
      }
    };

    this.audio = audio;

    // Try immediate playback
    audio.play().then(() => {
      this.setPlaying(true);
    }).catch(() => {
      // Browser autoplay restriction
      this.setPlaying(false);
    });
  }

  public togglePlay() {
    if (!this.hasInitialized) {
      this.init();
    }
    if (!this.audio) return;

    if (this.isPlaying) {
      this.audio.pause();
      this.setPlaying(false);
    } else {
      this.audio.play().then(() => {
        this.setPlaying(true);
      }).catch((err) => {
        console.warn('Playback error:', err);
        // Try fallback source if play failed
        if (this.currentSourceIndex + 1 < AUDIO_SOURCES.length) {
          this.currentSourceIndex++;
          this.createAudioInstance(this.currentSourceIndex);
          this.audio?.play().then(() => this.setPlaying(true)).catch(() => {});
        }
      });
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  public subscribe(listener: (playing: boolean) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private setPlaying(playing: boolean) {
    this.isPlaying = playing;
    this.listeners.forEach((l) => l(playing));
  }
}

export const musicManager = new BackgroundMusicManager();

export function useBackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(() => musicManager.getIsPlaying());

  useEffect(() => {
    musicManager.init();
    setIsPlaying(musicManager.getIsPlaying());
    return musicManager.subscribe((playing) => {
      setIsPlaying(playing);
    });
  }, []);

  return {
    isPlaying,
    togglePlay: () => musicManager.togglePlay(),
  };
}
