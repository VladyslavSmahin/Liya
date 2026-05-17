import { Link } from "react-router-dom";
import "./index.scss";

const homeSection = (hash) => ({ pathname: "/", hash });

export default function Footer() {
    return (
        <div className="footerWrapper">
            <footer className="footer container" id="footer">
                <Link to="/" className="footer__logo-link" aria-label="На головну">
                    <img src="/fav-icon.png" className="logo" alt="" />
                </Link>
                <nav>
                    <Link to={homeSection("#aboutMe")}>Про мене</Link>
                    <Link to="/poems">Мої вірші</Link>
                    <Link to={homeSection("#Feedback")}>Спілкування</Link>
                    <Link to={homeSection("#socials")}>Соц. мережі</Link>
                    <Link to="/privacy">Політика конфіденційності</Link>
                </nav>
                <div className="contactTeam">
                    <p className="contactTeam-designer">
                        Дизайн:
                        <a
                            href="https://www.instagram.com/miss.shaana/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {" "}
                            miss.shaana
                        </a>
                    </p>
                    <p className="contactTeam-music">
                        Музика:
                        <a
                            href="https://www.instagram.com/uspenskiy_drive/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {" "}
                            USPENSKIY DRIVE
                        </a>
                        ,{" "}
                        <a
                            href="https://www.instagram.com/liyayuzko/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Лія Юзько
                        </a>
                    </p>
                </div>
                <p className="contactDev">
                    Розробка та підтримка вебдодатків —{" "}
                    <a
                        href="https://www.instagram.com/vladismagin/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        зв’язок тут
                    </a>
                </p>
                <p>Всі права захищені © 2025</p>
            </footer>
        </div>
    );
}
