import "./index.scss";

const SITE_URL = "www.kvitka.com.ua";
const CONTACT_EMAIL = "kvitka@gmail.com";

export default function PrivacyPolicy() {
    return (
        <article className="privacy-page container">
            <h1 className="privacy-page__title">Політика конфіденційності</h1>

            <section className="privacy-page__section" aria-labelledby="privacy-general">
                <h2 id="privacy-general" className="privacy-page__heading">
                    Загальна інформація
                </h2>
                <p>
                    Ми збираємо лише ті персональні дані, які ви надаєте нам добровільно під час
                    відвідування або користування нашим веб-сайтом{" "}
                    <a href={`https://${SITE_URL}`} target="_blank" rel="noreferrer">
                        {SITE_URL}
                    </a>
                    .
                </p>
                <p>
                    Усі зібрані дані обробляються та зберігаються відповідно до чинного законодавства
                    України про захист персональних даних. Ми вживаємо розумних технічних і
                    організаційних заходів, щоб захистити вашу інформацію від несанкціонованого
                    доступу, зміни, розголошення чи знищення.
                </p>
                <p>
                    Користуючись цим сайтом, ви погоджуєтесь із положеннями цієї Політики
                    конфіденційності. Якщо ви не згодні з умовами, будь ласка, утримайтеся від
                    використання сайту.
                </p>
            </section>

            <section className="privacy-page__section" aria-labelledby="privacy-collect">
                <h2 id="privacy-collect" className="privacy-page__heading">
                    Інформація, яку ми можемо збирати
                </h2>
                <p>Ми можемо збирати такі персональні дані:</p>
                <ul className="privacy-page__list">
                    <li>ім&apos;я;</li>
                    <li>адреса електронної пошти;</li>
                    <li>номер телефону.</li>
                </ul>
                <p>
                    Дані надаються вами добровільно, коли ви заповнюєте форму зворотного зв&apos;язку,
                    підписуєтесь на розсилку або іншим чином взаємодієте з сайтом. Ми також можемо
                    автоматично збирати технічну інформацію про ваш візит (наприклад, тип браузера,
                    час відвідування, переглянуті сторінки) — лише в обсязі, необхідному для роботи
                    сайту та аналітики.
                </p>
            </section>

            <section className="privacy-page__section" aria-labelledby="privacy-controller">
                <h2 id="privacy-controller" className="privacy-page__heading">
                    Контролер
                </h2>
                <p>
                    Контролером персональних даних є власник сайту{" "}
                    <a href={`https://${SITE_URL}`} target="_blank" rel="noreferrer">
                        {SITE_URL}
                    </a>{" "}
                    (Kvitkova).
                </p>
                <p>
                    З усіх питань щодо обробки персональних даних звертайтеся за адресою:{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </p>
            </section>

            <section className="privacy-page__section" aria-labelledby="privacy-rights">
                <h2 id="privacy-rights" className="privacy-page__heading">
                    Ваші права
                </h2>
                <p>Ви маєте право:</p>
                <ul className="privacy-page__list">
                    <li>отримати доступ до своїх персональних даних;</li>
                    <li>вимагати виправлення або оновлення неточних даних;</li>
                    <li>вимагати видалення своїх персональних даних.</li>
                </ul>
                <p>
                    Щоб скористатися цими правами, надішліть запит на{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Ми розглянемо звернення
                    у розумний строк і повідомимо про результат.
                </p>
            </section>

            <section className="privacy-page__section" aria-labelledby="privacy-cookies">
                <h2 id="privacy-cookies" className="privacy-page__heading">
                    Використання файлів cookie
                </h2>
                <p>
                    Сайт{" "}
                    <a href={`https://${SITE_URL}`} target="_blank" rel="noreferrer">
                        {SITE_URL}
                    </a>{" "}
                    використовує файли cookie — невеликі текстові файли, які зберігаються на вашому
                    пристрої під час відвідування сторінок. Cookie допомагають сайту працювати
                    коректно, запам&apos;ятовувати ваші налаштування та покращувати зручність
                    користування.
                </p>
                <p>
                    Ми можемо використовувати сесійні cookie (видаляються після закриття браузера) та
                    постійні cookie (зберігаються на пристрої певний час). Деякі cookie потрібні для
                    технічної роботи сайту; інші — для статистики та аналізу ефективності контенту
                    (наприклад, які сторінки відвідують найчастіше).
                </p>
                <p>
                    Ви можете керувати cookie через налаштування свого браузера: блокувати їх,
                    видаляти або отримувати сповіщення перед збереженням. Зверніть увагу: відключення
                    cookie може обмежити функціональність окремих розділів сайту.
                </p>
                <p>
                    Продовжуючи користуватися сайтом без зміни налаштувань браузера, ви погоджуєтесь
                    на використання cookie відповідно до цієї Політики конфіденційності.
                </p>
            </section>
        </article>
    );
}
