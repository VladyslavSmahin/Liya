import {Link} from 'react-router-dom'
import './index.scss'

export default function Footer() {
    return (
        <div className='footerWrapper'>
            <footer className='footer'>
                <img src='../fav-icon.png' className='logo' alt='Logo'/>
                <nav>
                    <a href=''>Про мене</a>
                    <a href=''>Мої вірші</a>
                    <a href=''>Спілкування</a>
                    <a href=''>Соц. мережі</a>
                </nav>
                <div className='contactTeam'>
                    <p>Дизайн:<a href=''> miss.shaana</a></p>
                    <p>Музика:<a href=''> USPENSKIY DRIVE</a>, <a href=''> Лія Юзько</a></p>
                </div>
                <p>Всі права захищені © 2025</p>
            </footer>
        </div>
    )
}
