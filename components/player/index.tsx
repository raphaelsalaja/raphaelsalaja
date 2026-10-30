"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  IconCaptionsFill,
  IconExpandFill,
  IconPauseFill,
  IconPlayFill,
  IconVolumeFill,
  IconVolumeMutedFill,
} from "@/components/icons";
import styles from "./styles.module.css";

interface PlayerProps {
  src: string;
  poster: string;
  width: number;
  height: number;
  title: string;
  captions: string;
}

const IDLE_DELAY = 2000;
const SEEK_STEP = 5;
const VOLUME_STEP = 0.1;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

function formatTime(seconds: number) {
  const total = Math.max(0, seconds);
  return `${Math.floor(total / 60)}:${String(Math.floor(total % 60)).padStart(2, "0")}`;
}

function fractionAt(event: PointerEvent<HTMLElement>, axis: "x" | "y") {
  const rect = event.currentTarget.getBoundingClientRect();
  return clamp(
    axis === "x"
      ? (event.clientX - rect.left) / rect.width
      : (rect.bottom - event.clientY) / rect.height,
  );
}

export function Player({
  src,
  poster,
  width,
  height,
  title,
  captions,
}: PlayerProps) {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [idle, setIdle] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [cue, setCue] = useState<string | null>(null);
  const [preview, setPreview] = useState<number | null>(null);
  const [scrubbing, setScrubbing] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const paint = () => {
    const element = video.current;
    if (!element || !root.current) return;
    const total = element.duration || 0;
    const buffered = element.buffered.length
      ? element.buffered.end(element.buffered.length - 1)
      : 0;
    root.current.style.setProperty(
      "--played",
      String(total ? element.currentTime / total : 0),
    );
    root.current.style.setProperty(
      "--buffered",
      String(total ? buffered / total : 0),
    );
  };

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const tick = () => {
      const element = video.current;
      if (element && root.current) {
        root.current.style.setProperty(
          "--played",
          String(element.currentTime / (element.duration || 1)),
        );
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  useEffect(() => {
    const track = video.current?.textTracks[0];
    if (!track) return;
    track.mode = "hidden";
    const update = () => {
      const active = track.activeCues?.[0];
      setCue(active instanceof VTTCue ? active.text : null);
    };
    track.addEventListener("cuechange", update);
    return () => track.removeEventListener("cuechange", update);
  }, []);

  useEffect(() => {
    const element = video.current;
    if (element && element.readyState >= HTMLMediaElement.HAVE_METADATA) {
      setDuration(element.duration);
    }
    const update = () =>
      setFullscreen(document.fullscreenElement === root.current);
    document.addEventListener("fullscreenchange", update);
    return () => {
      document.removeEventListener("fullscreenchange", update);
      clearTimeout(idleTimer.current);
    };
  }, []);

  const wake = () => {
    setIdle(false);
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIdle(true), IDLE_DELAY);
  };

  const toggle = () => {
    const element = video.current;
    if (!element) return;
    if (element.paused || element.ended) {
      setStarted(true);
      element.play().catch(() => {});
    } else {
      element.pause();
    }
    wake();
  };

  const seek = (seconds: number) => {
    const element = video.current;
    if (!element?.duration) return;
    element.currentTime = Math.min(element.duration, Math.max(0, seconds));
    setTime(element.currentTime);
    setEnded(element.ended);
    paint();
  };

  const setLevel = (level: number) => {
    const element = video.current;
    if (!element) return;
    element.volume = clamp(level);
    element.muted = element.volume === 0;
  };

  const toggleMute = () => {
    const element = video.current;
    if (!element) return;
    if (element.muted || element.volume === 0) {
      element.muted = false;
      if (element.volume === 0) element.volume = 1;
    } else {
      element.muted = true;
    }
  };

  const toggleFullscreen = () => {
    const element = video.current as
      | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
      | null;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if (root.current?.requestFullscreen) {
      root.current.requestFullscreen().catch(() => {});
    } else {
      element?.webkitEnterFullscreen?.();
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!started || event.metaKey || event.ctrlKey || event.altKey) return;
    const target = event.target as HTMLElement;
    const onButton = target.closest("button") !== null;
    const onSlider = target.closest("[role=slider]") !== null;
    const key = event.key.toLowerCase();

    if (key === "k" || (key === " " && !onButton)) toggle();
    else if (key === "m") toggleMute();
    else if (key === "f") toggleFullscreen();
    else if (key === "c") setCaptionsOn((on) => !on);
    else if (key === "arrowleft" && !onSlider) seek(time - SEEK_STEP);
    else if (key === "arrowright" && !onSlider) seek(time + SEEK_STEP);
    else return;

    event.preventDefault();
    wake();
  };

  const onSeekKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = {
      ArrowLeft: time - SEEK_STEP,
      ArrowDown: time - SEEK_STEP,
      ArrowRight: time + SEEK_STEP,
      ArrowUp: time + SEEK_STEP,
      Home: 0,
      End: duration,
    };
    if (!(event.key in steps)) return;
    event.preventDefault();
    event.stopPropagation();
    seek(steps[event.key]);
  };

  const onVolumeKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const level = muted ? 0 : volume;
    const steps: Record<string, number> = {
      ArrowUp: level + VOLUME_STEP,
      ArrowRight: level + VOLUME_STEP,
      ArrowDown: level - VOLUME_STEP,
      ArrowLeft: level - VOLUME_STEP,
      Home: 0,
      End: 1,
    };
    if (!(event.key in steps)) return;
    event.preventDefault();
    event.stopPropagation();
    setLevel(steps[event.key]);
  };

  const level = muted ? 0 : volume;

  return (
    <section
      ref={root}
      aria-label={title}
      className={styles.root}
      data-started={started || undefined}
      data-playing={playing || undefined}
      data-idle={(playing && idle && !scrubbing) || undefined}
      style={{ aspectRatio: `${width} / ${height}` }}
      onKeyDown={onKeyDown}
      onPointerMove={wake}
      onPointerLeave={() => playing && setIdle(true)}
    >
      <video
        ref={video}
        className={styles.video}
        src={src}
        poster={poster}
        width={width}
        height={height}
        preload="metadata"
        playsInline
        onPlay={() => {
          setPlaying(true);
          setEnded(false);
        }}
        onPause={() => {
          setPlaying(false);
          paint();
        }}
        onEnded={() => setEnded(true)}
        onDurationChange={(event) => {
          setDuration(event.currentTarget.duration);
          paint();
        }}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onProgress={paint}
        onSeeked={paint}
        onVolumeChange={(event) => {
          setVolume(event.currentTarget.volume);
          setMuted(event.currentTarget.muted);
        }}
      >
        <track kind="captions" src={captions} srcLang="en" label="English" />
      </video>

      {(!started || ended) && (
        // biome-ignore lint/performance/noImgElement: mirrors the video poster, which is already a plain URL
        <img className={styles.poster} src={poster} alt="" />
      )}

      <button
        type="button"
        className={styles.surface}
        tabIndex={started && !ended ? -1 : 0}
        aria-label={
          playing ? "Pause" : ended ? `Replay ${title}` : `Play ${title}`
        }
        onClick={toggle}
      >
        {(!started || ended) && (
          <span className={styles.start}>
            <IconPlayFill size={20} />
          </span>
        )}
      </button>

      {captionsOn && cue && (
        <div className={styles.caption}>
          <span>{cue}</span>
        </div>
      )}

      {started && (
        <>
          <div className={`${styles.shade} ${styles.chrome}`} />
          <div className={`${styles.controls} ${styles.chrome}`}>
            <button
              type="button"
              className={styles.button}
              aria-label={playing ? "Pause (k)" : "Play (k)"}
              aria-keyshortcuts="k"
              onClick={toggle}
            >
              {playing ? (
                <IconPauseFill size={16} />
              ) : (
                <IconPlayFill size={16} />
              )}
            </button>

            <div className={styles.sound}>
              <button
                type="button"
                className={styles.button}
                aria-label={level === 0 ? "Unmute (m)" : "Mute (m)"}
                aria-keyshortcuts="m"
                onClick={toggleMute}
              >
                {level === 0 ? (
                  <IconVolumeMutedFill size={16} />
                ) : (
                  <IconVolumeFill size={16} />
                )}
              </button>
              <div className={styles.volume}>
                <div
                  role="slider"
                  tabIndex={0}
                  aria-label="Volume"
                  aria-orientation="vertical"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(level * 100)}
                  aria-valuetext={`${Math.round(level * 100)}% volume`}
                  className={styles.level}
                  style={{ "--level": level } as CSSProperties}
                  onKeyDown={onVolumeKey}
                  onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture(event.pointerId);
                    setLevel(fractionAt(event, "y"));
                  }}
                  onPointerMove={(event) => {
                    if (
                      event.currentTarget.hasPointerCapture(event.pointerId)
                    ) {
                      setLevel(fractionAt(event, "y"));
                    }
                  }}
                />
              </div>
            </div>

            <time className={styles.time} dateTime={`PT${Math.floor(time)}S`}>
              {formatTime(time)}
            </time>

            <div
              role="slider"
              tabIndex={0}
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(time)}
              aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
              className={styles.track}
              data-scrubbing={scrubbing || undefined}
              onKeyDown={onSeekKey}
              onPointerDown={(event) => {
                if (event.button !== 0) return;
                event.currentTarget.setPointerCapture(event.pointerId);
                setScrubbing(true);
                seek(fractionAt(event, "x") * duration);
              }}
              onPointerMove={(event) => {
                const fraction = fractionAt(event, "x");
                setPreview(fraction);
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                  seek(fraction * duration);
                }
              }}
              onPointerUp={() => setScrubbing(false)}
              onPointerCancel={() => setScrubbing(false)}
              onPointerLeave={() => setPreview(null)}
            >
              <div className={styles.rail}>
                <div className={styles.buffered} />
                <div className={styles.played} />
              </div>
              {preview !== null && (
                <div
                  className={styles.preview}
                  style={{ "--preview": preview } as CSSProperties}
                >
                  <span>{formatTime(preview * duration)}</span>
                </div>
              )}
            </div>

            <time
              className={styles.time}
              dateTime={`PT${Math.floor(duration - time)}S`}
            >
              −{formatTime(duration - time)}
            </time>

            <button
              type="button"
              className={styles.button}
              aria-label="Captions (c)"
              aria-keyshortcuts="c"
              aria-pressed={captionsOn}
              onClick={() => setCaptionsOn((on) => !on)}
            >
              <IconCaptionsFill size={16} />
            </button>

            <button
              type="button"
              className={styles.button}
              aria-label={
                fullscreen ? "Exit full screen (f)" : "Full screen (f)"
              }
              aria-keyshortcuts="f"
              onClick={toggleFullscreen}
            >
              <IconExpandFill size={16} />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
