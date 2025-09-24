import './index.scss'
import {useState} from "react";

export default function Home() {
    const [statisticItemsActiveIndex, setStatisticItemsActiveIndex] = useState(null);
    const statisticItems = [
        {
            img: "../vector-6.svg",
            count: "10+",
            text: <>разів<br />участь у конкурсах</>,
        },
        {
            count: "12+",
            text: "років творчості",
        },
        {
            count: "10+",
            text: "написаних віршів",
        },
    ];


    return (
        <div className="home-page container">
            <section className="home-section-1" id={`mainSection`}>
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
            <section className="home-section-2" id={`aboutMe`}>
                <div className="home-section-2-1col">
                    <picture>
                        <source
                            srcSet="../sect2-img-3.jpg"
                            media="(max-width: 768px)"
                        />
                        <img
                            className="sect2-img-1"
                            src="../sect2-img-1.jpg"
                            alt="mainImg"
                        />
                    </picture>
                </div>

                <div className='home-section-2-2col'>
                    <div>
                        <h3>Про мене</h3>
                        <p>Мене звати Лія і я вже достатньо довго цікавлюся поезією, прозою і музикою. Я хапаюсь
                            буквально за все творче та інколи не можу обрати: сьогодні буду малювати, писати вірші, чи
                            прозу, в'язати, чи вчити нову пісню.</p>
                    </div>
                        <picture className='sect2-img-2'>
                            <source
                                srcSet="../sect2-img-1-mobile.jpg"
                                media="(max-width: 768px)"
                            />
                            <img
                                className="sect2-img-1"
                                src="../sect2-img-2.jpg"
                                alt="mainImg"
                            />
                        </picture>
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
            <section className="home-section-3" id={`myArtNums`}>
                <div className='home-section-3-title'>
                    <h3>Цифри моєї творчості</h3>
                    <p>Творчість пронизана через все моє життя.
                        В даному блоці хочу це показати в цифрах..</p>
                </div>
                <div className='home-section-3-statistic'>
                    <div className="home-section-3-statistic">
                        {statisticItems.map((item, index) => (
                            <div
                                key={index}
                                className={`home-section-3-statistic-item ${
                                    statisticItemsActiveIndex === index ? "active" : ""
                                }`}
                                onClick={() => setStatisticItemsActiveIndex(index)}
                            >
                                {item.img && (
                                    <img
                                        className="home-section-3-img"
                                        src={item.img}
                                        alt="Img"
                                    />
                                )}
                                <p className="count">{item.count}</p>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="home-section-4" id={`myPoems`}>
                <div className='home-section-4-1'>
                   <div className='home-section-4-1-1'>
                       <h3>мої</h3>
                       <h3>вірші</h3>
                   </div>
                    <p className='home-section-4-1-2'>
                        Мої вірші — це не просто рими, а відображення мого внутрішнього світу. Я пишу про почуття, моменти, які залишають слід у серці, та думки, що народжуються серед тиші.<br/><br/>
                        У моїх віршах переплітаються ліричність і ніжність, спогади й мрії. Іноді вони легкі, мов подих вітру, а іноді — глибокі, як океан думок.
                    </p>
                    <button>Прочитати вірші</button>
                </div>
                <div className='home-section-4-2'>
                    <img className={`section-4-2-1-img`} src={`../sect4-img-1.jpg`} alt="Img"/>
                    <img className={`section-4-2-2-img`} src={`../sect4-img-2.jpg`} alt="Img"/>
                    <img className={`home-section-4-bg-1`} src={`../vector-7.svg`} alt="Img"/>
                    <img className={`home-section-4-bg-2`} src={`../vector-8.svg`} alt="Img"/>
                </div>
            </section>
            <section className="home-section-5">
                <div className='home-section-5-1'>
                    <img className={`section-5-2-1-img`} src={`../sect5-img-1.jpg`} alt="Img"/>
                    <img className={`section-5-2-2-img`} src={`../sect5-img-2.jpg`} alt="Img"/>
                    <img className={`home-section-5-bg-1`} src={`../vector-7.svg`} alt="Img"/>
                    <img className={`home-section-5-bg-2`} src={`../vector-9.svg`} alt="Img"/>
                </div>
                <div className='home-section-5-2'>
                    <div className='home-section-5-1-1'>
                        <h3>мій</h3>
                        <h3>збірник</h3>
                    </div>
                    <p className='home-section-5-1-2'>
                        Я завжди вірила, що слова мають силу торкатися серця, огортати душу і змінювати світогляд. Цей збірник — не просто вірші на папері. Це подорож крізь емоції, спогади, мрії та невимовні відчуття.<br/><br/>
                        Цей збірник — це моя відвертість, моя душа у словах. Сподіваюся, ти знайдеш у ньому щось своє — близьке, рідне, таке, що відгукнеться у твоєму серці.
                    </p>
                    <button>Замовити збірник</button>
                </div>
            </section>
            <section className="home-section-6"  id={`Feedback`}>
                <img className={`home-section-6-img`} src={`../sect-6-img-vector.svg`} alt="Img"/>
                <h3>Давай познайомимося ближче</h3>
                <div className='home-section-6-Content'>
                    <div className='home-section-6-leftContentWrapper'>
                        <div className='home-section-6-leftContentText'>
                            <h4>Трішки фактів про мене:</h4>
                            <p>1. Я солодкоїжка і обожнюю чорний шоколад. </p>
                            <p>2. Люблю вʼязати гачком.</p>
                            <p>3. Я меломан. В моєму плей-листі є все, від тяжкого<br/> року до фортепіанної музики.</p>
                            <p>4. Я екстраверт. Завжди рада знайомитись з новими <br/>людьми.</p>
                        </div>
                        <img className='home-section-6-leftContentWrapper-img' src={`../sect-6-img.jpg`} alt="Img"/>
                    </div>
                    <div className='home-section-6-rightContentWrapper'>
                        <div className='home-section-6-rightContentText'>
                            <h4>А тепер твоя черга!</h4>
                            <p>Мені буде дуже цікаво дізнатися щось про тебе. Поділися своїми улюбленими книгами, мріями або
                                тим, що надихає! </p>
                            <p>Також можеш написати мені — про почуття,
                                про вірші, про себе.</p>
                        </div>
                        <form>
                            <label htmlFor={`name`}></label>
                            <input id={`name`} type={`text`} placeholder={'Ім’я*'}/>
                            <label htmlFor={`email`}></label>
                            <input id={`email`} type={`email`} placeholder={'E-mail (для зворотньої відповіді)'}/>
                            <label htmlFor={`name`}></label>
                            <textarea id={`name`} placeholder={'Повідомлення*'}/>
                            <button>Відправити</button>
                        </form>
                    </div>
                </div>
            </section>
            <section className="home-section-7" id={`socials`}>
                <div className='home-section-7-title'>
                    <h3>Більше дізнатися про</h3>
                    <h3>мене можна тут</h3>
                </div>
                <div className='home-section-7-socialsCards'>
                    <div className='home-section-7-socialsCard'>
                        <img src={`../card-insta.jpg`} alt="Img"/>
                    </div>
                    <div className='home-section-7-socialsCard'>
                        <img src={`../card-tik-tok.jpg`} alt="Img"/>
                    </div>
                    <div className='home-section-7-socialsCard'>
                        <img src={`../card-yt.jpg`} alt="Img"/>
                    </div>
                </div>
                <p className={`home-section-7-bg-img-6`}>“</p>
                <p className={`home-section-7-bg-img-7`}>“</p>
                <img className={`home-section-7-bg-img-1`} src={`../vector-1.svg`} alt="Img"/>
                <img className={`home-section-7-bg-img-2`} src={`../vector-2.svg`} alt="Img"/>
                <img className={`home-section-7-bg-img-3`} src={`../vector-3.svg`} alt="Img"/>
                <img className={`home-section-7-bg-img-4`} src={`../vector-4.svg`} alt="Img"/>
                <img className={`home-section-7-bg-img-5`} src={`../vector-5.svg`} alt="Img"/>
            </section>
            <section className="home-section-8">
                <div className='home-section-8-content'>
                    <h4>“</h4>
                    <p>Для музиканта 3/4 — <span>це розмір твору,</span> але художник одразу подумає <span>про тип портрета.</span>про
                        тип портрета. Математик <span>не має права переконувати їх в тому що це дріб,</span> а для
                        студентів і школярів це<span> півтора семестра.</span> В тебе може бути вірна думка, але
                        вона <span>не єдина в своїй правильності.</span></p>
                </div>
                <img className={`home-section-8-bg-img-5-2`} src={`../sect8-img.jpg`} alt="Img"/>
                <img className={`home-section-8-bg-img-5-1`} src={`../sect8-2-img.jpg`} alt="Img"/>
            </section>
        </div>
    )
}
