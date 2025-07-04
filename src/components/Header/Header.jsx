import { Link } from 'react-router-dom'
import './index.scss'

export default function Header() {
    return (
        <header className={'header container'}>
            <nav>
                <a href=''>Про мене</a>
                <a href=''>Мої вірші</a>
                <img src='../fav-icon.png' className='logo' alt='Logo'/>
                <a href=''>Спілкування</a>
                <a href=''>Соц. мережі</a>
            </nav>
        </header>
    )
}
