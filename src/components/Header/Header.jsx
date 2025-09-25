import { Link, useLocation } from 'react-router-dom';
import './index.scss';
import { useEffect, useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Закриваємо меню при будь-якій зміні маршруту (включно з #якорями)
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname, location.hash, location.search]);

    const handleNavClick = () => setIsMenuOpen(false);

    return (
        <div className='headerWrapper'>
            <header className='header container'>
                <nav>
                    <div className='nav-links-left'>
                        <Link to='/#aboutMe'>Про мене</Link>
                        <Link to='/poems'>Мої вірші</Link>
                    </div>

                    <img src='../fav-icon.png' className='logo' alt='Logo' />

                    <div className='nav-links-left'>
                        <Link to='/#Feedback'>Спілкування</Link>
                        <Link to='/#socials'>Соц. мережі</Link>
                    </div>

                    <div
                        className={`burger ${isMenuOpen ? 'open' : ''}`}
                        onClick={() => setIsMenuOpen((v) => !v)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
            </header>

            <div className={`mobileMenu ${isMenuOpen ? 'active' : ''}`}>
                <span className='divider'></span>

                <div className='mobileMenu-links' onClick={handleNavClick}>
                    <Link to='/#aboutMe'>Про мене</Link>
                    <Link to='/poems'>Мої вірші</Link>
                    <Link to='/#Feedback'>Спілкування</Link>
                    <Link to='/#socials'>Соц. мережі</Link>
                    <a href='' onClick={handleNavClick}>Політика Конфіденційності</a>
                </div>

                <span className='divider-2'></span>

                <div className='mobileMenu-contactTeam' onClick={handleNavClick}>
                    <p className='contactTeam-designer'>
                        Дизайн:
                        <a href='https://www.instagram.com/miss.shaana/' target='_blank' rel='noreferrer'>
                            {' '}miss.shaana
                        </a>
                    </p>
                    <p className='contactTeam-music'>
                        Музика:
                        <a href='https://www.instagram.com/uspenskiy_drive/' target='_blank' rel='noreferrer'> USPENSKIY DRIVE</a>,
                        <a href='https://www.instagram.com/liyayuzko/' target='_blank' rel='noreferrer'> Лія Юзько</a>
                    </p>
                    <p className='contactDev'>
                        Розробка та підтримка вебдодатків —
                        <a href='https://www.instagram.com/vladismagin/' target='_blank' rel='noreferrer'>зв’язок тут</a>
                    </p>
                    <p>Всі права захищені © 2025</p>
                </div>
            </div>
        </div>
    );
}
