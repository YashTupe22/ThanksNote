const SONG_URL = "/song.mp3";

let audio: HTMLAudioElement | null = null;

export function getSongAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!audio) {
    audio = new Audio(SONG_URL);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.45;
    audio.load();
  }
  return audio;
}

/** Start downloading as early as possible (safe to call on the client). */
export function preloadSong(): void {
  getSongAudio();
  // Warm the HTTP cache in parallel with the media element buffer.
  void fetch(SONG_URL, { priority: "high" }).catch(() => {});
}

export function playSong(): Promise<void> {
  const a = getSongAudio();
  if (!a) return Promise.resolve();

  const start = () => a.play().then(() => undefined).catch(() => undefined);

  if (a.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
    return start();
  }

  return new Promise((resolve) => {
    const done = () => {
      a.removeEventListener("canplay", onReady);
      a.removeEventListener("canplaythrough", onReady);
      a.removeEventListener("error", onReady);
      void start().then(resolve);
    };
    const onReady = () => done();
    a.addEventListener("canplay", onReady, { once: true });
    a.addEventListener("canplaythrough", onReady, { once: true });
    a.addEventListener("error", onReady, { once: true });
    a.load();
  });
}

export function pauseSong(): void {
  audio?.pause();
}

export function isSongPaused(): boolean {
  return !audio || audio.paused;
}
