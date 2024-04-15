/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import "../News/News.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AxiosCall, { BASE_URL } from "../AxiosCall/AxiosCall";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useRef } from "react";
import { useContext } from "react";
import { StatesContext } from "../../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import Loading from "../Loading/Loading";
const News = () => {
  const [carouselArray, setCarouselArray] = useState([]);
  const [rightArray, setRightArray] = useState([]);
  const carouselRef = useRef();
  const navigate = useNavigate();

  const categoryId = "3383b09d-2e6a-4a37-b756-1aa10766b2c5"
  // lang
  const { lang } = useContext(StatesContext);

  useEffect(() => {
    getNews()
  }, []);

  function getNews() {
    let right = [];
    let left = [];
    AxiosCall("get", `/content/news/${lang}`).then((data) => {
      data?.contents.map((item, index) => {
        if (index >= 0 && index <= 3) {
          right.push(item);
        } else if (index > 3) {
          left.push(item);
        }
      });
      // delete dublicates
      const uniqueDataRight = right.filter((item, index) => {
        return (
          index ===
          right.findIndex((obj) => {
            return JSON.stringify(obj) === JSON.stringify(item);
          })
        );
      });
      setRightArray(uniqueDataRight);
      // delete dublicates
      const uniqueDataLeft = left.filter((item, index) => {
        return (
          index ===
          left.findIndex((obj) => {
            return JSON.stringify(obj) === JSON.stringify(item);
          })
        );
      });
      setCarouselArray(uniqueDataLeft);
    });
  }
  const handlePrevClick = () => {
    carouselRef.current.onClickPrev();
  };

  const handleNextClick = () => {
    carouselRef.current.onClickNext();
  };
  return (
    <section className="allnews" id="news">
      <div className="news">
        <div className="news_title">
          {lang === "uz" ? (
            <>
              <h1>Yangiliklar</h1>
              <span
                onClick={() => navigate(categoryId + "/all")}
              >
                Barcha yangiliklar
              </span>
            </>
          ) : lang === "en" ? (
            <>
              <h1>News</h1>
              <span onClick={() => navigate(categoryId + "/all")}>
                All news
              </span>
            </>
          ) : (
            <>
              <h1>Новости</h1>
              <span onClick={() => navigate(categoryId + "/all")}>
                Все новости
              </span>
            </>
          )}
        </div>
        <div className="news_row">
          <div className="left-carousel">
            {carouselArray.length > 0 ? (
              <Carousel ref={carouselRef} showThumbs={false}>
                {carouselArray.map((item, index) => {
                  const createdAt = new Date(item.created_at);
                  const formattedDate = `${createdAt.getMonth() + 1
                    }.${createdAt.getDate()}.${createdAt.getFullYear()}`;
                  const formattedTime = `${createdAt.getHours()}:${createdAt.getMinutes()}`;
                  return (
                    <div
                      className="card-col"
                      key={index}
                      onClick={() =>
                        item.title !== null || item.title !== "null"
                          ? navigate(
                            `/${item.id}`
                          )
                          : navigate(`/content/${item.id}`)
                      }
                    >
                      <div className="textes">
                        <span className="date-views">
                          {formattedDate} {formattedTime}
                          <span
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                            }}
                          >
                            <FontAwesomeIcon icon={faEye} />
                            {item.views}
                          </span>
                        </span>
                        <h6>{item.title}</h6>
                      </div>
                      <div className="image-container">
                        <img
                          src={
                            item.url != null
                              ? BASE_URL + item.url
                              : "https://archive.org/download/no-photo-available/no-photo-available.png"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            ) : (
              <div className="card-col">
                <div className="image-container">
                  <Loading />
                </div>
              </div>
            )}

            {carouselArray.length > 0 && (
              <div className="controller">
                <button onClick={() => handlePrevClick()}>
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path
                      d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883"
                      fill="#FFF"
                    />
                  </svg>
                </button>
                <button onClick={() => handleNextClick()}>
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path
                      fill="#FFF"
                      d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <div className="right-cards">
            <div className="cards">
              {rightArray.length > 0 ? (
                rightArray.map((item, index) => {
                  const createdAt = new Date(item.created_at);
                  const formattedDate = `${createdAt.getMonth() + 1
                    }.${createdAt.getDate()}.${createdAt.getFullYear()}`;
                  const formattedTime = `${createdAt.getHours()}:${createdAt.getMinutes()}`;
                  return (
                    <div
                      key={index}
                      className="card-col"
                      data-aos="zoom-in-up"
                      onClick={() =>
                        item.title != null || item.title != "null"
                          ? navigate(
                            `/${item.id}`
                          )
                          : navigate(`/content/${item.id}`)
                      }
                    >
                      <div className="textes">
                        <span className="date-views">
                          {formattedDate} {formattedTime}
                          <span
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                            }}
                          >
                            <FontAwesomeIcon icon={faEye} />
                            {item.views}
                          </span>
                        </span>
                        <h6>{item.title}</h6>
                      </div>
                      <div className="image-container">
                        <img
                          src={
                            item.url != null
                              ? BASE_URL + item.url
                              : "https://archive.org/download/no-photo-available/no-photo-available.png"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="card-col">
                    <div className="image-container">
                      <Loading />
                    </div>
                  </div>

                  <div className="card-col">
                    <div className="image-container">
                      <Loading />
                    </div>
                  </div>
                  <div className="card-col">
                    <div className="image-container">
                      <Loading />
                    </div>
                  </div>
                  <div className="card-col">
                    <div className="image-container">
                      <Loading />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
