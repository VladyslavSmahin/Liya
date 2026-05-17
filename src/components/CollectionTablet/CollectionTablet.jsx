import { useEffect, useRef, useState } from "react";
import "./index.scss";

const SWIPE_MS = 480;
const INTERVAL_MS = 5000;

function pickRandomIndex(current, length) {
    if (length <= 1) return 0;
    let next = current;
    while (next === current) {
        next = Math.floor(Math.random() * length);
    }
    return next;
}

export default function CollectionTablet({ poems }) {
    const [currentIndex, setCurrentIndex] = useState(() =>
        Math.floor(Math.random() * poems.length),
    );
    const [outgoingIndex, setOutgoingIndex] = useState(null);
    const currentRef = useRef(currentIndex);
    const transitionRef = useRef(null);

    useEffect(() => {
        currentRef.current = currentIndex;
    }, [currentIndex]);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            if (transitionRef.current) return;

            const prev = currentRef.current;
            const next = pickRandomIndex(prev, poems.length);
            transitionRef.current = window.setTimeout(() => {
                transitionRef.current = null;
                setOutgoingIndex(null);
            }, SWIPE_MS);

            setOutgoingIndex(prev);
            setCurrentIndex(next);
            currentRef.current = next;
        }, INTERVAL_MS);

        return () => {
            window.clearInterval(intervalId);
            if (transitionRef.current) {
                window.clearTimeout(transitionRef.current);
                transitionRef.current = null;
            }
        };
    }, [poems.length]);

    const renderPoem = (index, variant) => {
        const poem = poems[index];
        if (!poem) return null;

        const lines = poem.lines.filter((line) => line.trim() !== "");

        return (
            <article
                key={`${poem.id}-${variant}`}
                className={`collection-tablet__poem collection-tablet__poem--${variant}`}
                aria-hidden={variant === "out"}
            >
                <h3 className="collection-tablet__title">{poem.title}</h3>
                <div className="collection-tablet__body">
                    {lines.map((line, i) => (
                        <p key={i} className="collection-tablet__line">
                            {line}
                        </p>
                    ))}
                </div>
            </article>
        );
    };

    return (
        <div className="collection-tablet" aria-live="polite" aria-atomic="true">
            <img
                className="collection-tablet__frame"
                src="/tab_img.png"
                alt="Збірник віршів на планшеті"
            />
            <div className="collection-tablet__screen">
                {outgoingIndex !== null && renderPoem(outgoingIndex, "out")}
                {renderPoem(currentIndex, outgoingIndex !== null ? "in" : "idle")}
            </div>
            <span className="visually-hidden">{poems[currentIndex]?.title}</span>
        </div>
    );
}
