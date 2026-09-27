import { useState, useEffect } from 'react';

// Local background track (served from /public/audio) -- reliable, no external
// dependency, and no CORS/CDN failure risk like remote stock audio URLs had.
const AUDIO_SRC = '/audio/background-music.mp3';

class BackgroundMusicManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private hasInitialized = false;

  public init() {
    if (this.hasInitialized || typeof window === 'undefined') return;
    this.hasInitialized = true;

    this.createAudioInstance();

    // Most browsers block audio-with-sound autoplay until the user has
    // interacted with the page at least once. We attempt to play
    // immediately (works in some browsers/contexts), and if that's
    // blocked, we transparently start playback on the very first
    // interaction of any kind -- click, tap, scroll, key press, or even
    // mouse movement -- so entering the site still feels like "autoplay"
    // from the user's perspective.
    const unlockAutoplay = () => {
      if (this.audio && !this.isPlaying) {
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

  private createAudioInstance() {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = 'auto';

    audio.onerror = () => {
      console.warn('Background music failed to load.');
    };

    this.audio = audio;

    // Try immediate playback (succeeds in some browsers/contexts,
    // otherwise the interaction-unlock listeners above take over).
    audio.play().then(() => {
      this.setPlaying(true);
    }).catch(() => {
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
