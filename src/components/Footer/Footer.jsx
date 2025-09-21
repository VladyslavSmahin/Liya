import {Link} from 'react-router-dom'
import './index.scss'

export default function Footer() {
    return (
        <div className='footerWrapper'>
            <footer className='footer container' id={`#footer`}>
                <img src='../fav-icon.png' className='logo' alt='Logo'/>
                <nav>
                    <a href=''>Про мене</a>
                    <a href=''>Мої вірші</a>
                    <a href=''>Спілкування</a>
                    <a href=''>Соц. мережі</a>
                </nav>
                <div className='contactTeam'>
                    <p className='contactTeam-designer'>Дизайн:<a href='https://www.instagram.com/miss.shaana/' target='_blank'> miss.shaana</a></p>
                    <p className='contactTeam-music'>Музика:<a href='https://www.instagram.com/uspenskiy_drive/' target='_blank'> USPENSKIY DRIVE</a>, <a href='https://www.instagram.com/liyayuzko/' target='_blank'> Лія Юзько</a></p>
                </div>
                <p className='contactDev'>Розробка та підтримка вебдодатків — <a href="https://www.instagram.com/vladismagin/" target="_blank">зв’язок тут</a></p>
                <p>Всі права захищені © 2025</p>
            </footer>
        </div>
    )
}
