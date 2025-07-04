import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home/Home.jsx";
import Poems from "./pages/Poems/Poems.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import './App.scss'
import PrivacyPolicy from "./pages/Contact/Contact.jsx";
function App() {
    return (
        <div className='wrapper'>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/poems" element={<Poems />} />
                    <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
