import './index.scss'

export default function Home() {
    return (
        <div className="home-page container">
            <section className="home-section-1">
                <div className="home-section-1-left">
                    <div>
                        музыка будет
                    </div>
                    <div className='h1-wrapper'>
                        <h1>Лавандова
                            поезія</h1>
                        <p>Коли не вистачає слів - народжуються вірші..</p>
                    </div>
                </div>
                <div className="home-section-1-right">
                    <img src='../sect1-img.png' alt="mainImg"/>
                </div>
            </section>
            <section className="home-section-2">
                <div className='home-section-2-1col'>
                    <img className='sect2-img-1' src='../sect2-img-1.jpg' alt="mainImg"/>
                </div>
                <div className='home-section-2-2col'>
                    <div>
                        <h3>Про мене</h3>
                        <p>Мене звати Лія і я вже достатньо довго цікавлюся поезією, прозою і музикою. Я хапаюсь буквально за все творче та інколи не можу обрати: сьогодні буду малювати, писати вірші, чи прозу, в'язати, чи вчити нову пісню.</p>
                    </div>
                    <img className='sect2-img-2' src='../sect2-img-2.jpg' alt="mainImg"/>
                </div>
                <div className='home-section-2-3col'>
                    <img className='sect2-img-3' src='../sect2-img-3.jpg' alt="mainImg"/>
                    <div>
                        <h3>Ціль моєї творчості</h3>
                        <div className='home-section-2-3col-text'>
                            <img className='sect2-img-4' src='../sect2-img-4.png' alt="mainImg"/>
                            <p>Я завжди намагалась влити душу в кожне невеличке творіння, сподіваюсь,
                                що це відчутно, адже для мене завжди було дуже важливим відкрити її частинку іншим.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="home-section-3"></section>
            <section className="home-section-4"></section>
            <section className="home-section-5"></section>
            <section className="home-section-6"></section>
            <section className="home-section-7"></section>
        </div>
    )
}
