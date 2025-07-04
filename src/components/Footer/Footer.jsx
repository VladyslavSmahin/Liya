import { Link } from 'react-router-dom'
import './index.scss'

export default function Footer() {
    return (
        <header>
            <nav >
                <Link to="/">Обо мне</Link>
                <Link to="/poems">Мои стихи</Link>
                <Link to="/contact">Общение</Link>
            </nav>
        </header>
    )
}
