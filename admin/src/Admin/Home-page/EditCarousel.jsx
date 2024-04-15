import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import Rodal from "rodal";

import AxiosCall, { BASE_URL } from "../../AxiosCall/AxiosCall";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Button, IconButton } from "@mui/material";
export default function EditCarousel() {
  const carouselRef = useRef(null);
  const [addSlide, setAddSlide] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(null);
  const [deletingId, setDeletingId] = useState("");
  const [textUZ, setTextUZ] = useState("");
  const [textRU, setTextRU] = useState("");
  const [textEN, setTextEN] = useState("");
  const [img, setImg] = useState("");
  const [file, setFile] = useState(null);
  const [array, setArray] = useState([]);

  const getSlider = (method) => {
    AxiosCall("get", `/slider/UZ`).then((data) => {
      setArray(data);
      if (method === "delete") {
        if (data.length === carouselRef.current.state.selectedItem) {
          carouselRef.current.onClickPrev();
        }
      }
    });
  };
  const handlePrevClick = () => {
    carouselRef.current.onClickPrev();
  };

  const handleNextClick = () => {
    carouselRef.current.onClickNext();
  };

  function updateItem(item) {
    setIsEdit(item);
    setAddSlide(true);
    AxiosCall("get", `/slider/edit/${item.id}`).then((data) => {
      const currentSlide = data.find((i) => i.id === item.id);
      currentSlide?.texts?.map((item) => {
        if (item.lan === "UZ") {
          setTextUZ(item.text);
        } else if (item.lan === "RU") {
          setTextRU(item.text);
        } else if (item.lan === "EN") {
          setTextEN(item.text);
        }
      });
    });
  }

  function deleteConfirm(id) {
    setAlertVisible(true);
    setDeletingId(id);
  }

  // !!!
  function deleteSlide() {
    AxiosCall("delete", `/slider/${deletingId}`).then((res) => {
      setAlertVisible(false);
      setDeletingId("");
      setTextRU("")
      setTextUZ("")
      setTextEN("")
      getSlider("delete");
    });
  }

  function saveSlide(e) {
    e.preventDefault();
    if (!isEdit) {
      if (!file) return toast.error("Rasm qo'shilmagan");
      let formData = new FormData();
      formData.append("file", file);
      AxiosCall("post", "/slider", {
        textUZ,
        textRU,
        textEN,
      })
        .then((data) => {
          AxiosCall("post", "/slider/image/" + data, formData)
            .then(() => {
              getSlider();
              setFile(null);
              setTextEN("");
              setTextRU("");
              setTextUZ("");
              setAddSlide(false);
              toast.success("Slide muvaffaqiyatli yuklandi");
            })
            .catch((error) => {
              toast.error("Xatolik");
            });
        })
        .catch(() => {
          toast.error("Malumotlar yuklanishida xatolik!");
        });
    } else {
      // !!!
      let formData = new FormData();
      file && formData.append("file", file);

      AxiosCall("put", "/slider/" + isEdit.id, {
        textEN,
        textRU,
        textUZ,
      }).then(() => {
        getSlider();
        setAddSlide(false);
        setIsEdit(null);
        setTextEN("");
        setTextRU("");
        setTextUZ("");
      });
    }
  }

  async function getImage(e) {
    let file = e.target.files[0];
    setFile(e.target.files[0]);
    setImg(await toBase64(file));
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    getSlider();
  }, []);

  return (
    <>
      <div className="add-item">
        <Button variant="contained" onClick={() => setAddSlide(true)}>
          + Slide Qo'shish
        </Button>
      </div>
      {array.length!==0?
          <Carousel showThumbs={false} className="EditCarousel" ref={carouselRef}>
        {
          array.length!==0&&array?.map((item, index) => {
                  return (
                      <div className="banner_item" key={item.id}>
                        <div className="banner_item_content">
                          <div className="controller">
                            <IconButton
                                className="delete-btn"
                                onClick={() => deleteConfirm(item.id)}
                            >
                              <DeleteIcon/>
                            </IconButton>
                            <IconButton
                                className="edit-btn"
                                onClick={() => updateItem(item)}
                            >
                              <EditIcon/>
                            </IconButton>
                          </div>
                          <div className="banner_item_img">
                            {item.url != null && (
                                <img
                                    crossOrigin="anonymous"
                                    alt="banner_item_img"
                                    src={BASE_URL + "/" + item.url}
                                />
                            )}
                            <img
                                crossOrigin="anonymous"
                                alt="banner_item_img"
                                src={BASE_URL + "/" + item.url}
                            />
                          </div>
                          <div className="container" data-aos="fade-down-right">
                            <div className="textes">
                              <h1>{item.text}</h1>
                            </div>
                            <div className="buttons">
                              {array.length > 1 && (
                                  <>
                                    <IconButton
                                        className="icon-container"
                                        onClick={handlePrevClick}
                                    >
                                      <KeyboardArrowLeftIcon/>
                                    </IconButton>
                                    {index != array.length - 1 && (
                                        <IconButton
                                            className="icon-container"
                                            onClick={handleNextClick}
                                        >
                                          <KeyboardArrowRightIcon/>
                                        </IconButton>
                                    )}
                                  </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                  );
                })
        }
          </Carousel>:
          <div className={'EditCarousel'}>
            <div className="banner_item">
              <span className="not-found">Ma'lumot mavjud emas!</span>
            </div>
          </div>

        }
      <Rodal
        width={250}
        height={120}
        visible={alertVisible}
        onClose={() => {
          setAlertVisible(false)
          setTextRU("")
          setTextUZ("")
          setTextEN("")
        }}
      >
        <div className="alert-box">
          <span>O'chirilsinmi?</span>
          <div className="btns">
            <button className="yes-btn" onClick={() => deleteSlide()}>
              ha
            </button>
            <button className="no-btn" onClick={() => {
              setAlertVisible(false)
              setTextRU("")
              setTextUZ("")
              setTextEN("")
            }}>
              yo'q
            </button>
          </div>
        </div>
      </Rodal>
      <Rodal
        visible={addSlide}
        onClose={() => setAddSlide(false)}
        width={500}
        height={300}
      >
        <form onSubmit={saveSlide} className="form-inputs">
          {!isEdit && (
            <label>
              <input type="file" hidden onChange={getImage} />
              <FontAwesomeIcon icon={faImage} />
              {file ? file.name : "Rasm joylash"}
            </label>
          )}
          <textarea
            type="text"
            placeholder="Sarlavha"
            value={textUZ}
            onChange={(e) => setTextUZ(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Заголовок"
            value={textRU}
            onChange={(e) => setTextRU(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Title"
            value={textEN}
            onChange={(e) => setTextEN(e.target.value)}
          />
          <button onClick={saveSlide} className="submit-btn">
            Saqlash
          </button>
        </form>
      </Rodal>
    </>
  );
}
