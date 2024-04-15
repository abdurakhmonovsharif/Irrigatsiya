import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import AxiosCall, { BASE_URL } from "../../../AxiosCall/AxiosCall";
import { StatesContext } from "../../../../context/GlobalContext";
import Loading2 from "../../../Loading/Loading2";
import { Stack } from "react-bootstrap";
import PaginationComponent from "./Pagination";
import no_photo_available from "../../../../Images/no-photo-available.png";
const AllDetelied = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { lang } = useContext(StatesContext);
  useEffect(() => {
    get();
  }, [id, currentPage]);
  function get() {
    AxiosCall("get", `/content/${lang}/${id}/${currentPage}`).then((data) => {
      setTotalPages(data.pageCount);
      setData(data.contents);
      setLoading(false);
    });
  }
  const navigate = useNavigate();
  return (
    <section className="allDetelied">
      <div className="Announcements-body">
        <div className="cards">
          {data && !loading ? (
            data?.map((item, index) => {
              const createdAt = new Date(item.created_at);
              const formattedDate = `${
                createdAt.getMonth() + 1
              }.${createdAt.getDate()}.${createdAt.getFullYear()}`;
              const formattedTime = `${String(createdAt.getHours()).padStart(
                2,
                "0"
              )}:${String(createdAt.getMinutes()).padStart(2, "0")}`;

              return (
                <div
                  key={index}
                  className="card-col"
                  onClick={() => navigate(`/${item.id}`)}
                >
                  <div className="card-col-header">
                    <div className="time-container">
                      <span>
                        {formattedDate} {formattedTime}
                      </span>
                    </div>
                    <div className="viwers">
                      <FontAwesomeIcon icon={faEye} />
                      <span>{item.views}</span>
                    </div>
                  </div>
                  <div className="card-col-body">
                    <div className="title">{item.title}</div>
                    <img
                      className="image"
                      alt="image"
                      src={
                        item.url == null
                          ? no_photo_available
                          : BASE_URL + item.url
                      }
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="content-loading">
              <Loading2 />
            </div>
          )}
        </div>

        {data.length > 0 && (
          <Stack spacing={2}>
            <PaginationComponent
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Stack>
        )}
      </div>
    </section>
  );
};

export default AllDetelied;
