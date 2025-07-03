import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home/Home.jsx";
import Poems from "./pages/Poems/Poems.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import './App.scss'
function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/poems" element={<Poems />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
