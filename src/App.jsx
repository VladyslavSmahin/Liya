import {Routes, Route, useLocation, BrowserRouter} from 'react-router-dom'
import Home from "./pages/Home/Home.jsx";
import Poems from "./pages/Poems/Poems.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import './App.scss'
import PrivacyPolicy from "./pages/Contact/Contact.jsx";
import {useEffect} from "react";

function ScrollToHash() {
    const { hash } = useLocation();
    useEffect(() => {
        if (hash) {
            const el = document.getElementById(hash.slice(1));
            if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollTo({ top: 0 });
        }
    }, [hash]);
    return null;
}


function App() {
    return (
        <div>
            <ScrollToHash />
            <div className="wrapper">
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
        </div>
    )
}

export default App
