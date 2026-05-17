import "./index.scss";

function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PoemPlayer({
    title,
    isPlaying,
    progress,
    currentTime,
    duration,
    volume,
    liked,
    onToggle,
    onSeek,
    onSeekStart,
    onSeekEnd,
    onVolumeChange,
    onToggleLike,
}) {
    const remaining = Math.max(0, duration - currentTime);

    return (
        <div className="poem-player">
            <button
                type="button"
                className={`poem-player__play ${isPlaying ? "is-paused" : ""}`}
                onClick={onToggle}
                aria-label={isPlaying ? "Пауза" : "Відтворити"}
            />

            <div className="poem-player__main">
                <p className="poem-player__title">{title}</p>
                <input
                    type="range"
                    className="poem-player__progress"
                    min="0"
                    max="100"
                    step="0.1"
                    value={Number.isFinite(progress) ? progress : 0}
                    onInput={(e) => onSeek(Number(e.target.value))}
                    onChange={(e) => onSeek(Number(e.target.value))}
                    onPointerDown={onSeekStart}
                    onPointerUp={onSeekEnd}
                    onPointerCancel={onSeekEnd}
                    aria-label="Прогрес відтворення"
                />
            </div>

            <div className="poem-player__controls">
                <span className="poem-player__volume-icon" aria-hidden="true" />
                <input
                    type="range"
                    className="poem-player__volume"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onInput={(e) => onVolumeChange(Number(e.target.value))}
                    onChange={(e) => onVolumeChange(Number(e.target.value))}
                    aria-label="Гучність"
                />
                <span className="poem-player__time">-{formatTime(remaining)}</span>
                <button
                    type="button"
                    className={`poem-player__like ${liked ? "is-liked" : ""}`}
                    onClick={onToggleLike}
                    aria-label="Улюблене"
                    aria-pressed={liked}
                />
            </div>
        </div>
    );
}
