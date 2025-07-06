import { Link } from 'react-router-dom'
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
               <a href=''>Про мене</a>
               <a href=''>Мої вірші</a>
               <a href=''>Спілкування</a>
               <a href=''>Соц. мережі</a>
           </div>
       </div>
    )
}
