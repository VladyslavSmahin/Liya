import { useEffect, useRef, useState } from "react";
import "./index.scss";

export default function MusicCircle({
                                        playlist = [{ title: "Track 1", src: "/audio/track1.mp3" }],
                                        text = "— turn on the music — ",
                                        speed = 12
                                    }) {
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [uiRevealed, setUiRevealed] = useState(false);
    const [playlistOpen, setPlaylistOpen] = useState(true);
    const [progress, setProgress] = useState(0); // % прогресса текущего трека

    const audioRef = useRef(null);
    const current = playlist[index];

    const viewBox = "0 0 200 200";
    const radius = 80;

    const safePlay = async () => {
        const a = audioRef.current;
        if (!a) return;
        try {
            const p = a.play();
            if (p && typeof p.then === "function") await p;
            setIsPlaying(true);
            setUiRevealed(true);
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

    const handlePrev = () => {
        const nextIdx = (index - 1 + playlist.length) % playlist.length;
        setIndex(nextIdx);
        setTimeout(safePlay, 0);
    };

    const handleNext = () => {
        const nextIdx = (index + 1) % playlist.length;
        setIndex(nextIdx);
        setTimeout(safePlay, 0);
    };

    const onEnded = () => {
        if (playlist.length > 1) {
            handleNext(); // автоплей следующего
        } else {
            setIsPlaying(false);
        }
    };

    const onTimeUpdate = () => {
        const a = audioRef.current;
        if (!a || !a.duration) return;
        setProgress((a.currentTime / a.duration) * 100);
    };

    // сброс прогресса при смене трека
    useEffect(() => {
        setProgress(0);
        if (audioRef.current) audioRef.current.currentTime = 0;
    }, [index]);

    // громкость
    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume;
    }, [volume]);

    return (
        <div className="mc" style={{ ["--mc-speed"]: `${speed}s` }}>
            <audio
                ref={audioRef}
                src={current?.src}
                preload="metadata"
                onEnded={onEnded}
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={() => setProgress(0)}
                onError={() =>
                    console.log("Audio error, src:", audioRef.current?.currentSrc)
                }
            />

            {/* КРУГ */}
            <div className={`mc-disc ${isPlaying ? "playing" : ""}`}>
                <svg className="mc-ring" viewBox={viewBox} aria-hidden="true">
                    <defs>
                        <path
                            id="mc-circlePath"
                            d={`M 100,100 m -${radius},0 a ${radius},${radius} 0 1,1 ${
                                radius * 2
                            },0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
                        />
                    </defs>
                    <text className="mc-text">
                        <textPath href="#mc-circlePath" startOffset="0%">
                            {text.repeat(2)}
                        </textPath>
                    </text>
                </svg>

                {/* Play/Pause */}
                <button
                    className={`mc-btn ${isPlaying ? "pause" : ""}`}
                    onClick={toggle}
                    aria-label={isPlaying ? "Пауза" : "Відтворити"}
                    title={isPlaying ? "Пауза" : "Відтворити"}
                >
                    <span className="mc-icon" />
                </button>
            </div>

            {/* Панель управления появляется только после первого play */}
            {uiRevealed && (
                <div className="mc-controls-Wrapper">
                    {/* Prev / Next */}


                    {/* Плейлист */}
                    <div className="mc-pl-wrap fade-in">
                        {playlistOpen ? (
                            <>
                                <div className="mc-pl-head">
                                    <span className="mc-pl-title">Плейлист</span>
                                    <button
                                        className="mc-pl-close"
                                        onClick={() => setPlaylistOpen(false)}
                                        aria-label="Скрыть плейлист"
                                        title="Скрыть плейлист"
                                    >
                                        Плейлист приховати
                                    </button>
                                </div>
                                <div className="mc-controls fade-in">
                                    <button className="mc-ctl" onClick={handlePrev} aria-label="Previous">
                                        ⟨⟨
                                    </button>
                                    <button className="mc-ctl" onClick={handleNext} aria-label="Next">
                                        ⟩⟩
                                    </button>
                                </div>

                                {/* Volume */}
                                <div className="mc-volume fade-in">
                                    <span>🔊</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={(e) => setVolume(Number(e.target.value))}
                                    />
                                    <span className="mc-volval">{Math.round(volume * 100)}%</span>
                                </div>
                                <ul className="mc-trackList">
                                    {playlist.map((t, i) => {
                                        const isActive = i === index;
                                        return (
                                            <li
                                                key={t.src || i}
                                                className={`mc-track ${isActive ? "active" : ""} ${
                                                    isActive && isPlaying ? "playing" : ""
                                                }`}
                                                style={
                                                    isActive
                                                        ? { ["--progress"]: `${progress}%` }
                                                        : undefined
                                                }
                                                onClick={() => {
                                                    setIndex(i);
                                                    setTimeout(safePlay, 0);
                                                }}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) =>
                                                    (e.key === "Enter" || e.key === " ") &&
                                                    (setIndex(i), setTimeout(safePlay, 0))
                                                }
                                                title={t.title || t.src}
                                            >
                                                <span className="dot" />
                                                <span className="title">
                          {t.title || `Track ${i + 1}`}
                        </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        ) : (
                            <button
                                className="mc-pl-open"
                                onClick={() => setPlaylistOpen(true)}
                                aria-label="Открыть плейлист"
                            >
                                Плейлист
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
