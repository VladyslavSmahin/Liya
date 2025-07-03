import { Link } from 'react-router-dom'
import './index.scss'

export default function Header() {
    return (
        <header style={{ padding: '1rem', background: '#eee' }}>
            <nav style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/">Обо мне</Link>
                <Link to="/poems">Мои стихи</Link>
                <Link to="/contact">Общение</Link>
            </nav>
        </header>
    )
}
