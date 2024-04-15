import React, { useEffect, useState } from "react";
import "../Footer/Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTelegram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { StatesContext } from "../../context/GlobalContext";
import { useContext } from "react";
import AxiosCall from "../AxiosCall/AxiosCall";
import { Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { lang } = useContext(StatesContext);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [modalvisible, setModalvisible] = useState(false);
  const date = new Date();

  function sendComment(e) {
    e.preventDefault();
    setModalvisible(false);
    AxiosCall("post", "/message", {
      authorFirstname: firstname,
      authorLastname: lastname,
      telNumber: phone,
      body,
      title,
      emailAddress: email,
    }).then(() => {});
  }
  const location = useLocation();
  // tiiamebb.uz
  useEffect(() => {
    let top_r = `id=40798&r=${escape(document.referrer)}&pg=${escape(
      window.location.href
    )}`;
    document.cookie = "smart_top=1; path=/";
    top_r += "&c=" + (document.cookie ? "Y" : "N");
    top_r += "&j=" + (navigator.javaEnabled() ? "Y" : "N");
    top_r +=
      "&wh=" +
      window.screen.width +
      "x" +
      window.screen.height +
      "&px=" +
      (navigator.appName.substring(0, 3) == "Mic"
        ? window.screen.colorDepth
        : window.screen.pixelDepth);
    let top_rat = "&col=340F6E&t=ffffff&p=BD6F6F";
    let trackingElement = `<a href="http://www.uz/ru/res/visitor/index?id=40798" target=_top><img src="http://cnt0.www.uz/counter/collect?${top_r}${top_rat}" width=88 height=31 border=0 alt="Топ рейтинг www.uz"></a>`;

    let footerDiv1 = document.getElementById("rating1");
    if (footerDiv1) {
      footerDiv1.innerHTML = trackingElement;
    }
  }, [location]);
  // hemis.tiiamebb.uz
  useEffect(() => {
    let top_r = `id=45016&r=${escape(document.referrer)}&pg=${escape(
      window.location.href
    )}`;
    document.cookie = "smart_top=1; path=/";
    top_r += "&c=" + (document.cookie ? "Y" : "N");
    top_r += "&j=" + (navigator.javaEnabled() ? "Y" : "N");
    top_r +=
      "&wh=" +
      window.screen.width +
      "x" +
      window.screen.height +
      "&px=" +
      (navigator.appName.substring(0, 3) == "Mic"
        ? window.screen.colorDepth
        : window.screen.pixelDepth);
    let top_rat = "&col=F7AE00&t=ffffff&p=0E418F";
    let trackingElement = `<a href="http://www.uz/ru/res/visitor/index?id=45016" target=_top><img src="http://cnt0.www.uz/counter/collect?${top_r}${top_rat}" width=88 height=31 border=0 alt="Топ рейтинг www.uz"></a>`;

    let footerDiv = document.getElementById("rating2");
    if (footerDiv) {
      footerDiv.innerHTML = trackingElement;
    }
  }, [location]);
  // student.tiiamebb.uz
  useEffect(() => {
    let top_r = `id=46787&r=${escape(document.referrer)}&pg=${escape(
      window.location.href
    )}`;
    document.cookie = "smart_top=1; path=/";
    top_r += "&c=" + (document.cookie ? "Y" : "N");
    top_r += "&j=" + (navigator.javaEnabled() ? "Y" : "N");
    top_r +=
      "&wh=" +
      window.screen.width +
      "x" +
      window.screen.height +
      "&px=" +
      (navigator.appName.substring(0, 3) == "Mic"
        ? window.screen.colorDepth
        : window.screen.pixelDepth);
    let top_rat = "&col=E13C00&t=ffffff&p=59BE60";
    let trackingElement = `<a href="http://www.uz/ru/res/visitor/index?id=46787" target=_top><img src="http://cnt0.www.uz/counter/collect?${top_r}${top_rat}" width=88 height=31 border=0 alt="Топ рейтинг www.uz"></a>`;

    let footerDiv = document.getElementById("rating3");
    if (footerDiv) {
      footerDiv.innerHTML = trackingElement;
    }
  }, []);
  // yandex
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://mc.yandex.ru/metrika/tag.js';
    script.async = true;

    const initializeMetrika = () => {
      window.ym(96531824, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true
      });
    };

    // Define a function to check if Yandex.Metrika is loaded
    const checkIfMetrikaLoaded = () => {
      if (window.ym && typeof window.ym === 'function') {
        initializeMetrika();
      } else {
        setTimeout(checkIfMetrikaLoaded, 100); // Check again after 100ms
      }
    };

    // Check if script already exists to prevent duplicates
    const existingScript = document.querySelector('script[src="https://mc.yandex.ru/metrika/tag.js"]');
    if (!existingScript) {
      document.body.appendChild(script);
      script.onload = checkIfMetrikaLoaded;
    } else {
      checkIfMetrikaLoaded();
    }

    // Cleanup function to remove the script when component unmounts
    return () => {
      if (existingScript) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);
  return (
    <footer className="footer">
      <div className="footer_contact">
        <div className="footer_contact_title">
          {lang === "uz" ? (
            <>
              <h1>Bog'lanish</h1>
            </>
          ) : lang === "en" ? (
            <>
              <h1>Contact us </h1>
            </>
          ) : (
            <>
              <h1>Связь</h1>
            </>
          )}
        </div>
        <div className="footer_contact_row">
          <div className="footer_contact_row_col">
            {lang === "uz" ? (
              <>
                <h5>Mo'ljal:</h5>
              </>
            ) : lang === "en" ? (
              <>
                {" "}
                <h5>Target:</h5>
              </>
            ) : (
              <>
                <h5> Цель:</h5>
              </>
            )}
            {lang === "uz" ? (
              <>
                <p>«Sherbudin» Savdo majmuasi.</p>
              </>
            ) : lang === "en" ? (
              <>
                {" "}
                <p>Trade Complex "Sherbudin".</p>
              </>
            ) : (
              <>
                <p> Торговый Комплекс "Шербудин".</p>
              </>
            )}
            {lang === "uz" ? (
              <>
                <h4>
                  Transportlar: 72, 236-avtobuslar yo`nalish taksilari.
                  <br />
                  Buxoro shahri, Gazli shoh ko‘chasi 32-uy
                </h4>
              </>
            ) : lang === "en" ? (
              <>
                {" "}
                <h4>
                  Transport: buses 72, 236, taxis.
                  <br />
                  Bukhara city, Gazli street 32
                </h4>
              </>
            ) : (
              <>
                <h4>
                  {" "}
                  Транспорт: автобусы 72, 236, такси.
                  <br />
                  г. Бухара, улица Газли 32.
                </h4>
              </>
            )}
          </div>
          <div className="footer_contact_row_col">
            {lang === "uz" ? (
              <>
                <h5>Telefon:</h5>
              </>
            ) : lang === "en" ? (
              <>
                {" "}
                <h5>Telephone:</h5>
              </>
            ) : (
              <>
                <h5>Телефон:</h5>
              </>
            )}
            <a className="footer__tel_number" href="tel:+998 (65) 228-94-24">
              +998 (65) 228-94-24
            </a>
          </div>
          <div className="footer_contact_row_col">
            {lang === "uz" ? (
              <>
                <h5>Faks:</h5>
              </>
            ) : lang === "en" ? (
              <>
                {" "}
                <h5>Fax:</h5>
              </>
            ) : (
              <>
                <h5> Факс:</h5>
              </>
            )}

            <p>Fax:0(365) 228-94-24</p>
          </div>
          <div className="footer_contact_row_col">
            <h5>Email:</h5>
            <a className="email" target={"_blank"} href="https://umail.uz/">
              tiimbfuz@umail.uz, buxtimi@mail.ru ,
              <br /> info@tiiamebb.uz
            </a>
          </div>
          <div className="footer_contact_row_col">
            {lang === "uz" ? (
              <>
                <h5>Ijtimoiy tarmoqlar:</h5>
              </>
            ) : lang === "en" ? (
              <>
                {" "}
                <h5>Social networks:</h5>
              </>
            ) : (
              <>
                <h5> Социальные сети:</h5>
              </>
            )}

            <div className="footer_contact_row_col_social">
              <a
                href="https://www.facebook.com/tiiame.uz/"
                target={"_blank"}
                className="footer_contact_row_col_social_item"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="https://twitter.com/tiiameofficial?lang=en"
                target={"_blank"}
                className="footer_contact_row_col_social_item"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="https://t.me/TIQXMMIBuxoro"
                target={"_blank"}
                className="footer_contact_row_col_social_item"
              >
                <FontAwesomeIcon icon={faTelegram} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCR2v5fa2y7-fjoDWyEMU0Sg"
                target={"_blank"}
                className="footer_contact_row_col_social_item"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer_contact_row2">
          <div className="footer_contact_row2_col">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6133.057335824391!2d64.4581287!3d39.7726897!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f500593eb541ad1%3A0xba79947337de01c8!2sBukharskiy%20Filial%20Tashkentskogo%20Instituta%20injinerov%20Irrigatsiy%20i%20mexanizatsiy%20sellskogo%20xozaystvo!5e0!3m2!1sen!2s!4v1677563769836!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              title="mapUniversity"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="footer-right-row">
            <div className="work-times">
              <span>
                {lang === "uz"
                  ? "Ish kunlari:"
                  : lang === "ru"
                  ? "Рабочие дни:"
                  : "Working days:"}
              </span>
              <div className="information-card">
                {lang === "uz"
                  ? "Du-Pa"
                  : lang === "ru"
                  ? "Пон-Чет"
                  : "Mon-Thurs"}
                : 9:00 - 18:00
              </div>
              <div className="information-card">
                {lang === "uz"
                  ? "Tushlik:"
                  : lang === "ru"
                  ? "Обед:"
                  : "Lunch:"}{" "}
                13:00 - 14:00
              </div>
            </div>
            <div className="other">
              <span>
                {lang === "uz"
                  ? `Bog'lanish uchun:`
                  : lang === "ru"
                  ? "Связаться:"
                  : "To contact:"}
              </span>
              <a href="tel:+998 (65) 228-94-24" className="information-card">
                +998 (65) 228-94-24
              </a>
              <div
                className="information-card"
                onClick={() => setModalvisible(true)}
              >
                {lang === "uz"
                  ? "Rektorga murojat"
                  : lang === "ru"
                  ? "Обращение к ректору"
                  : "Appeal to the Rector"}
              </div>
            </div>
          </div>
        </div>
        <div className="footer_contact_row3">
          {lang === "uz" ? (
            <>
              <p>© {date.getFullYear()} Barcha huquqlar himoyalangan</p>
            </>
          ) : lang === "en" ? (
            <>
              {" "}
              <p>© {date.getFullYear()} All rights reserved</p>
            </>
          ) : (
            <>
              <p> © {date.getFullYear()} Все права защищены</p>
            </>
          )}
          <div className="rating_cards">
            <div id="rating1"></div>
            <div id="rating2"></div>
            <div id="rating3"></div>
            <div id="rating4"></div>
            <div id="rating5"></div>
          </div>
          <p>
            {lang === "uz" ? (
              <>
                <span>Sayt yaratuvchisi:</span>
              </>
            ) : lang === "en" ? (
              <>
                {" "}
                <span>Site creator:</span>
              </>
            ) : (
              <>
                <span> Создатель сайта:</span>
              </>
            )}
            UNIPOINT SOFTWARE DEVELOPMENT
          </p>
        </div>
        <Modal show={modalvisible} onHide={() => setModalvisible(false)}>
          <Modal.Body>
            <div className="email-box">
              <div className="email-header">
                <h5>
                  {lang === "uz"
                    ? "Izoh qoldirish"
                    : lang === "ru"
                    ? "Оставить комментарий"
                    : "Leave a comment"}
                </h5>
              </div>
              <div className="body">
                <form onSubmit={sendComment}>
                  <div className="inputs">
                    <input
                      required
                      placeholder={
                        lang === "uz"
                          ? "Ism"
                          : lang === "ru"
                          ? "Фамилия"
                          : "First Name"
                      }
                      onChange={(e) => setFirstname(e.target.value)}
                      value={firstname}
                    />

                    <input
                      required
                      placeholder={
                        lang === "uz"
                          ? "Familya"
                          : lang === "ru"
                          ? "Фамилия"
                          : "Last Name"
                      }
                      onChange={(e) => setLastname(e.target.value)}
                      value={lastname}
                    />

                    <input
                      required
                      placeholder={
                        lang === "uz"
                          ? "Telefon raqam"
                          : lang === "ru"
                          ? "Номер телефона"
                          : "Phone"
                      }
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                    />

                    <input
                      type="email"
                      required
                      placeholder={
                        lang === "uz"
                          ? "Elektron pochta "
                          : lang === "ru"
                          ? "Электронная почта "
                          : "Email"
                      }
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />

                    <input
                      required
                      placeholder={
                        lang === "uz"
                          ? "Sarlavha"
                          : lang === "ru"
                          ? "Электронная почта или номер телефона"
                          : "Title"
                      }
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                    <textarea
                      required
                      placeholder={
                        lang === "uz"
                          ? "Xat"
                          : lang === "ru"
                          ? "Комментарий"
                          : "Message"
                      }
                      onChange={(e) => setBody(e.target.value)}
                      value={body}
                    />
                  </div>
                  <div className="btns mt-4">
                    <button
                      type="button"
                      className="close-btn"
                      onClick={() => setModalvisible(false)}
                    >
                      {lang === "uz"
                        ? "Yopish"
                        : lang === "ru"
                        ? "закрывать"
                        : "Close"}
                    </button>
                    <button type="submit" className="send-btn">
                      {lang === "uz"
                        ? "Yuborish"
                        : lang === "ru"
                        ? "Отправить"
                        : "Send"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </footer>
  );
};

export default Footer;
