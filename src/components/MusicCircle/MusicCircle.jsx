import { useEffect, useRef, useState } from "react";
import "./index.scss";

function IconBack() {
    return (
        <svg className="mc-svg" width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
            <path d="M6.5 1L1 7l5.5 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 7h16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function IconPrev() {
    return (
        <svg className="mc-svg" width="14" height="16" viewBox="0 0 14 16" aria-hidden="true">
            <path
                d="M12.5 1.5L4 8l8.5 6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function IconPlay() {
    return (
        <svg className="mc-svg" width="14" height="16" viewBox="0 0 14 16" aria-hidden="true">
            <path d="M2 1.5v13L12.5 8 2 1.5z" fill="currentColor" />
        </svg>
    );
}

function IconPause() {
    return (
        <svg className="mc-svg mc-svg--pause" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <rect x="3" y="2" width="3.5" height="12" rx="0.5" fill="currentColor" />
            <rect x="9.5" y="2" width="3.5" height="12" rx="0.5" fill="currentColor" />
        </svg>
    );
}

function IconVolume() {
    return (
        <svg className="mc-svg" width="18" height="16" viewBox="0 0 18 16" aria-hidden="true">
            <path
                d="M1 5.5v5h2.5L7.5 14V2L3.5 5.5H1zm9.5 1a4 4 0 010 3M12 3.5a7.5 7.5 0 010 9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function MusicCircle({
    playlist = [{ title: "Track 1", src: "/audio/track1.mp3" }],
    text = "— turn on the music — ",
    speed = 12,
}) {
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.2);
    const [playlistOpen, setPlaylistOpen] = useState(true);
    const [progress, setProgress] = useState(0);

    const audioRef = useRef(null);
    const current = playlist[index];

    const viewBox = "0 0 200 200";
    const radius = 80;
    const pathLength = 2 * Math.PI * radius;
    const ringText = text.replace(/—/g, "").trim().toLowerCase();

    const safePlay = async () => {
        const a = audioRef.current;
        if (!a) return;
        try {
            const p = a.play();
            if (p && typeof p.then === "function") await p;
            setIsPlaying(true);
        } catch (e) {
            setIsPlaying(false);
            console.warn("Play error:", e);
        }
    };

    const toggle = async () => {
        const a = audioRef.current;
        if (!a) return;
        if (isPlaying) {
            a.pause();
            setIsPlaying(false);
        } else {
            await safePlay();
        }
    };

    const selectTrack = (i) => {
        setIndex(i);
        setTimeout(safePlay, 0);
    };

    const handlePrev = () => {
        const nextIdx = (index - 1 + playlist.length) % playlist.length;
        selectTrack(nextIdx);
    };

    const handleNext = () => {
        const nextIdx = (index + 1) % playlist.length;
        selectTrack(nextIdx);
    };

    const onEnded = () => {
        if (playlist.length > 1) {
            handleNext();
        } else {
            setIsPlaying(false);
        }
    };

    const onTimeUpdate = () => {
        const a = audioRef.current;
        if (!a || !a.duration) return;
        setProgress((a.currentTime / a.duration) * 100);
    };

    useEffect(() => {
        setProgress(0);
        if (audioRef.current) audioRef.current.currentTime = 0;
    }, [index]);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume;
    }, [volume]);

    return (
        <div
            className={`mc ${playlistOpen ? "mc--open" : "mc--closed"}`}
            style={{ "--mc-speed": `${speed}s` }}
        >
            <audio
                ref={audioRef}
                src={current?.src}
                preload="metadata"
                onEnded={onEnded}
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={() => setProgress(0)}
                onError={() => console.warn("Audio error:", audioRef.current?.currentSrc)}
            />

            <div className="mc-inner">
                <div className={`mc-disc ${isPlaying ? "mc-disc--playing" : ""}`}>
                    <svg className="mc-ring" viewBox={viewBox} aria-hidden="true">
                        <defs>
                            <path
                                id="mc-circlePath"
                                d={`M 100,100 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
                            />
                        </defs>
                        <text
                            className="mc-text"
                            textLength={pathLength}
                            lengthAdjust="spacing"
                        >
                            <textPath href="#mc-circlePath" startOffset="0%">
                                {`${ringText} - `.repeat(2)}
                            </textPath>
                        </text>
                    </svg>

                    <button
                        type="button"
                        className="mc-disc-btn"
                        onClick={toggle}
                        aria-label={isPlaying ? "Пауза" : "Відтворити"}
                    >
                        {isPlaying ? <IconPause /> : <IconPlay />}
                    </button>
                </div>

                <div className="mc-aside">
                    <button
                        type="button"
                        className="mc-pl-toggle"
                        onClick={() => setPlaylistOpen((open) => !open)}
                        aria-expanded={playlistOpen}
                        aria-controls="mc-playlist-panel"
                    >
                        <IconBack />
                        <span>{playlistOpen ? "Приховати плейлист" : "Плейлист"}</span>
                    </button>

                    <div
                        id="mc-playlist-panel"
                        className="mc-panel-wrap"
                        aria-hidden={!playlistOpen}
                    >
                        <div className="mc-panel-inner">
                            <div className="mc-panel-content">
                                <ul className="mc-tracks">
                                    {playlist.map((t, i) => {
                                        const isActive = i === index;
                                        return (
                                            <li key={t.src || i}>
                                                <button
                                                    type="button"
                                                    className={`mc-track ${isActive ? "mc-track--active" : ""} ${
                                                        isActive && isPlaying ? "mc-track--playing" : ""
                                                    }`}
                                                    style={
                                                        isActive && isPlaying
                                                            ? { "--progress": `${progress}%` }
                                                            : undefined
                                                    }
                                                    onClick={() => selectTrack(i)}
                                                    tabIndex={playlistOpen ? 0 : -1}
                                                >
                                                    {t.title || `Track ${i + 1}`}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div className="mc-toolbar">
                                    <button
                                        type="button"
                                        className="mc-toolbar-btn mc-toolbar-btn--outline"
                                        onClick={handlePrev}
                                        aria-label="Попередній трек"
                                        tabIndex={playlistOpen ? 0 : -1}
                                    >
                                        <IconPrev />
                                    </button>

                                    <button
                                        type="button"
                                        className="mc-toolbar-btn"
                                        onClick={toggle}
                                        aria-label={isPlaying ? "Пауза" : "Відтворити"}
                                        tabIndex={playlistOpen ? 0 : -1}
                                    >
                                        {isPlaying ? <IconPause /> : <IconPlay />}
                                    </button>

                                    <div className="mc-volume">
                                        <IconVolume />
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.01"
                                            value={volume}
                                            onChange={(e) => setVolume(Number(e.target.value))}
                                            aria-label="Гучність"
                                            tabIndex={playlistOpen ? 0 : -1}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
