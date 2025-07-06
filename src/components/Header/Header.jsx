import {Link} from 'react-router-dom'
import './index.scss'
import {useState} from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className='headerWrapper'>
            <header className={'header container'}>
                <nav>
                    <div className='nav-links-left'>
                        <a href=''>Про мене</a>
                        <a href=''>Мої вірші</a>
                    </div>
                    <img src='../fav-icon.png' className='logo' alt='Logo'/>
                    <div className='nav-links-left'>
                        <a href=''>Спілкування</a>
                        <a href=''>Соц. мережі</a>
                    </div>
                    <div
                        className={`burger ${isMenuOpen ? 'open' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
            </header>
            <div className={`mobileMenu ${isMenuOpen ? 'active' : ''}`}>
                <span className='divider'></span>
                <div className='mobileMenu-links'>
                    <a href=''>Про мене</a>
                    <a href=''>Мої вірші</a>
                    <a href=''>Спілкування</a>
                    <a href=''>Соц. мережі</a>
                    <a href=''>Політика Конфіденційності</a>
                </div>
                <span className='divider-2'></span>
                <div className='mobileMenu-contactTeam'>
                    <p className='contactTeam-designer'>Дизайн:<a href='https://www.instagram.com/miss.shaana/'
                                                                  target='_blank'> miss.shaana</a></p>
                    <p className='contactTeam-music'>Музика:<a href='https://www.instagram.com/uspenskiy_drive/'
                                                               target='_blank'> USPENSKIY DRIVE</a>, <a
                        href='https://www.instagram.com/liyayuzko/' target='_blank'> Лія Юзько</a></p>
                    <p className='contactDev'>Розробка та підтримка вебдодатків — <a
                        href="https://www.instagram.com/vladismagin/" target="_blank">зв’язок тут</a></p>
                    <p>Всі права захищені © 2025</p>
                </div>
            </div>
        </div>
    )
}
