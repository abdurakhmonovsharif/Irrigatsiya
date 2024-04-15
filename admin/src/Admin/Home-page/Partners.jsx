import React, { useContext, useState } from "react";

import Carousel from "react-multi-carousel";

import AxiosCall, { BASE_URL } from "../../AxiosCall/AxiosCall";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StatesContext } from "../../context/GlobalContext";
import { Button } from "@mui/material";

function Partners() {
  const navigate = useNavigate();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const [id, setId] = useState("");
  const [xorijiy, setXorijiy] = useState([]);
  const { isAddPartner, setIsAddPartner } = useContext(StatesContext);

  useEffect(() => {
    getPartners();
  }, []);
  function getPartners() {
    AxiosCall("get", "/foreign_partners/UZ").then((data) => {
      setXorijiy(data);
    });
  }
  function navigateToAdd() {
    setIsAddPartner(true);
    localStorage.setItem("foreign_partners", "add");
    localStorage.setItem("c_n", "Hamkorlar");
    navigate(`/main/foreign_partners/content/add`);
  }
  function editPartners(id) {
    setIsAddPartner(true);
    navigate(`/main/foreign_partners/content/${id}/edit`);
    localStorage.setItem("foreign_partners", "edit");
  }
  return (
    <div className="partners-container">
      <h6>Hamkorlar</h6>
      <Button variant="contained" onClick={() => navigateToAdd()}>
        + Hamkor qo'shish
      </Button>
      <Carousel
        responsive={responsive}
        autoPlay
        transitionDuration={"1s"}
        itemClass="carousel-item-padding-40-px"
      >
        {xorijiy.map((item, index) => (
          <div
            key={index}
            onClick={() => editPartners(item.id)}
            className="card-col"
          >
            <div className="image-container">
              {item.url != null && <img src={BASE_URL + item.url} alt="" />}
            </div>
            <div className="text-container">
              <span>{item.title}</span>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Partners;
