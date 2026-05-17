import { useCallback, useEffect, useRef, useState } from "react";
import { poems } from "../../data/poems.js";
import PoemPlayer from "../../components/PoemPlayer/PoemPlayer.jsx";
import CollectionTablet from "../../components/CollectionTablet/CollectionTablet.jsx";
import "./index.scss";

export default function Poems() {
    const [activeId, setActiveId] = useState(poems[0].id);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.85);
    const [likedIds, setLikedIds] = useState(() => new Set());
    const [feedback, setFeedback] = useState("");

    const audioRef = useRef(null);
    const isSeekingRef = useRef(false);
    const activePoem = poems.find((p) => p.id === activeId) ?? poems[0];

    const syncDuration = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const dur = audio.duration;
        if (Number.isFinite(dur) && dur > 0) setDuration(dur);
    }, []);

    const playActive = useCallback(async () => {
        const audio = audioRef.current;
        if (!audio) return;
        try {
            await audio.play();
            setIsPlaying(true);
        } catch {
            setIsPlaying(false);
        }
    }, []);

    const selectPoem = useCallback((id) => {
        setActiveId(id);
        setProgress(0);
        setCurrentTime(0);
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.src = activePoem.audio;
        audio.load();
        playActive();
    }, [activeId, activePoem.audio, playActive]);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume;
    }, [volume]);

    const handleVolumeChange = useCallback((value) => {
        setVolume(value);
        if (audioRef.current) audioRef.current.volume = value;
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            playActive();
        }
    };

    const handleTimeUpdate = () => {
        if (isSeekingRef.current) return;
        const audio = audioRef.current;
        if (!audio) return;
        const dur = audio.duration;
        if (!Number.isFinite(dur) || dur <= 0) return;
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / dur) * 100);
    };

    const handleSeek = (value) => {
        const audio = audioRef.current;
        if (!audio) return;
        const dur = audio.duration;
        if (!Number.isFinite(dur) || dur <= 0) return;
        const nextTime = (value / 100) * dur;
        audio.currentTime = nextTime;
        setProgress(value);
        setCurrentTime(nextTime);
    };

    const handleSeekStart = () => {
        isSeekingRef.current = true;
    };

    const handleSeekEnd = () => {
        isSeekingRef.current = false;
        const audio = audioRef.current;
        if (!audio) return;
        const dur = audio.duration;
        if (!Number.isFinite(dur) || dur <= 0) return;
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / dur) * 100);
    };

    const toggleLike = () => {
        setLikedIds((prev) => {
            const next = new Set(prev);
            if (next.has(activeId)) next.delete(activeId);
            else next.add(activeId);
            return next;
        });
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        if (!feedback.trim()) return;
        setFeedback("");
    };

    return (
        <div className="poems-page container">
            <audio
                ref={audioRef}
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={syncDuration}
                onDurationChange={syncDuration}
                onCanPlay={syncDuration}
                onEnded={() => setIsPlaying(false)}
            />

            <h1 className="poems-page__title">Пропоную послухати вірші моєї душі</h1>

            <section className="poems-board" aria-label="Вірші з музикою">
                <div className="poems-board__covers">
                    {poems.map((poem) => {
                        const isActive = poem.id === activeId;
                        return (
                            <button
                                key={poem.id}
                                type="button"
                                className={`poems-cover ${isActive ? "poems-cover--active" : ""}`}
                                onClick={() => selectPoem(poem.id)}
                                aria-pressed={isActive}
                                aria-label={`${poem.title}, ${poem.author}`}
                            >
                                <img src={poem.cover} alt="" />
                                <span className="poems-cover__caption">{poem.coverCaption}</span>
                                {isActive && (
                                    <div className="poems-cover__overlay">
                                        <span className="poems-cover__play" aria-hidden="true" />
                                        <span className="poems-cover__meta">
                                            {poem.playerLabel} {poem.author}
                                        </span>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                <article className="poems-board__reader">
                    <h2 className="poems-board__poem-title">{activePoem.title}</h2>
                    <div className="poems-board__poem-text">
                        {activePoem.lines.map((line, i) =>
                            line ? <p key={i}>{line}</p> : <br key={i} />
                        )}
                    </div>
                    <p className="poems-board__poem-date">{activePoem.date}</p>
                    {activePoem.avatar && (
                        <img
                            className="poems-board__avatar"
                            src={activePoem.avatar}
                            alt=""
                            aria-hidden="true"
                        />
                    )}
                </article>

                <PoemPlayer
                    title={`${activePoem.playerLabel} ${activePoem.author}`}
                    isPlaying={isPlaying}
                    progress={progress}
                    currentTime={currentTime}
                    duration={duration}
                    volume={volume}
                    liked={likedIds.has(activeId)}
                    onToggle={togglePlay}
                    onSeek={handleSeek}
                    onSeekStart={handleSeekStart}
                    onSeekEnd={handleSeekEnd}
                    onVolumeChange={handleVolumeChange}
                    onToggleLike={toggleLike}
                />
            </section>

            <section className="poems-feedback" aria-labelledby="poems-feedback-title">
                <h2 id="poems-feedback-title" className="poems-feedback__title">
                    Які рядки торкнулись твоєго серця?
                </h2>

                <div className="poems-feedback__inner">
                    <div className="poems-feedback__visual">
                        <img
                            src="/unsplash_qdPnQuGeuwU.png"
                            alt="Квіти у формі серця"
                        />
                    </div>

                    <form className="poems-feedback__form" onSubmit={handleFeedbackSubmit}>
                        <label className="poems-feedback__label" htmlFor="poems-feedback-text">
                            Поділитися думками
                        </label>
                        <textarea
                            id="poems-feedback-text"
                            className="poems-feedback__input"
                            placeholder="Поділитися думками.."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                        <button type="submit" className="poems-feedback__submit">
                            Відправити
                        </button>
                    </form>

                    <img
                        className="poems-feedback__decor poems-feedback__decor--arc"
                        src="/vector-2.svg"
                        alt=""
                        aria-hidden="true"
                    />
                    <img
                        className="poems-feedback__decor poems-feedback__decor--lavender"
                        src="/vector-5.svg"
                        alt=""
                        aria-hidden="true"
                    />
                </div>
            </section>

            <section className="poems-collection" id="collection" aria-labelledby="poems-collection-title">
                <h2 id="poems-collection-title" className="poems-collection__heading">
                    <span className="poems-collection__heading-main">Сподобались</span>{" "}
                    <span className="poems-collection__heading-accent">вірші?</span>
                </h2>

                <div className="poems-collection__grid">
                    <p className="poems-collection__aside">
                        Більше можна побачити у моєму збірнику.
                    </p>

                    <div className="poems-collection__visual">
                        <img
                            className="poems-collection__decor poems-collection__decor--ring"
                            src="/vector-2.svg"
                            alt=""
                            aria-hidden="true"
                        />
                        <img
                            className="poems-collection__decor poems-collection__decor--flowers"
                            src="/sect2-img-4.png"
                            alt=""
                            aria-hidden="true"
                        />
                        <CollectionTablet poems={poems} />
                    </div>

                    <div className="poems-collection__info">
                        <p className="poems-collection__lead">Поезія, що торкається душі...</p>
                        <p className="poems-collection__text">
                            У цій збірці — найщиріші рядки про кохання, пошуки себе та натхнення.
                            Це історія у віршах, яка змусить відчути кожне слово.
                        </p>
                        <p className="poems-collection__format">
                            <strong>Формат:</strong> PDF
                        </p>
                        <p className="poems-collection__note">
                            Отримаєте на e-mail одразу після оплати
                        </p>
                        <a href="#collection" className="poems-collection__cta">
                            Замовити збірник
                        </a>
                    </div>
                </div>
            </section>

            <section className="poems-quote" aria-label="Цитата">
                <blockquote className="poems-quote__content">
                    <p className="poems-quote__mark" aria-hidden="true">“</p>
                    <div className="poems-quote__verses poems-quote__verses--desktop">
                        <p className="poems-quote__line">
                            Можливо, мене <span>доля</span> просто <span>тестить</span>,
                        </p>
                        <p className="poems-quote__line">
                            Та я за цим не можу вже <span>встигати</span>...
                        </p>
                        <p className="poems-quote__line">
                            Моє <span>життя</span> <span>несеться</span> в темпі Presto,
                        </p>
                        <p className="poems-quote__line">
                            А я за ним волочуся <span>Andante</span>.
                        </p>
                    </div>
                    <div className="poems-quote__verses poems-quote__verses--mobile">
                        <p className="poems-quote__line">Зіштовхуються інколи світи,</p>
                        <p className="poems-quote__line">І серце перелякане заходиться</p>
                        <p className="poems-quote__line">Я не боюсь насправді темноти,</p>
                        <p className="poems-quote__line">Мене лякає те, що в ній</p>
                        <p className="poems-quote__line">знаходиться</p>
                    </div>
                </blockquote>

                <div className="poems-quote__gallery">
                    <img
                        className="poems-quote__img poems-quote__img--left"
                        src="/unsplash_jhHNgQE50tQ.png"
                        alt=""
                    />
                    <img
                        className="poems-quote__img poems-quote__img--right"
                        src="/unsplash_Hj8eZ_wK1eM.png"
                        alt=""
                    />
                </div>
            </section>
        </div>
    );
}
