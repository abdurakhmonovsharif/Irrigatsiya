import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import React, { useEffect, useState } from "react";
import Rodal from "rodal";
import { useNavigate, useParams } from "react-router-dom";
import AxiosCall from "../../AxiosCall/AxiosCall";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";

const AdminSider = ({ setSelectedCategory, user }) => {
  const navigate = useNavigate("");
  const { id } = useParams();
  const [nameUz, setNameUz] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [nameUzEdit, setNameUzEdit] = useState("");
  const [nameRuEdit, setNameRuEdit] = useState("");
  const [nameEnEdit, setNameEnEdit] = useState("");
  const [modalvisibles, setModalvisibles] = useState(false);
  const [isedit, setIsEdit] = useState(null);
  const [deleteingId, setDeletingId] = useState("");
  const [deletes, setDeletes] = useState(false);
  const [categories, setCategories] = useState([]);
   const [isLoading,setIsLoading]=useState(false)
  useEffect(() => {
      setIsLoading(true)
    getCategories();
  }, [id]);

  function getCategories() {
    AxiosCall("get", "/navbar_categories").then((data) => {
      setCategories(data);
        setIsLoading(false)

      data.map((item) => {
        if (item.id === id) {
          localStorage.setItem("c_n", item.name);
          localStorage.setItem("c_i", item.id);
        }
      });
    });
  }

  function addCategory() {
    setModalvisibles(false);
    if (isedit == null) {
      AxiosCall("post", "/navbar_categories", {
        category1NamesDTO: [
          { categories1Names: { name: nameUz, lan: "UZ" } },
          { categories1Names: { name: nameRu, lan: "RU" } },
          { categories1Names: { name: nameEn, lan: "EN" } },
        ],
      }).then((data) => {
        getCategories();
        setModalvisibles(false);
      });
    } else {
      AxiosCall("put", "/navbar_categories/" + isedit.id, {
        category1NamesDTO: [
          { categories1Names: { name: nameUz, lan: "UZ" }, id: nameUzEdit },
          { categories1Names: { name: nameRu, lan: "RU" }, id: nameRuEdit },
          { categories1Names: { name: nameEn, lan: "EN" }, id: nameEnEdit },
        ],
      }).then((data) => {
        setIsEdit(null);
        getCategories();
        setModalvisibles(false);
        setNameUzEdit("");
        setNameRuEdit("");
        setNameEnEdit("");
      });
    }
    setNameEn("");
    setNameRu("");
    setNameUz("");
  }
  function editCategory(item) {
    setIsEdit(item);
    setModalvisibles(true);
    AxiosCall("get", "/navbar_categories/" + item.id).then((data) => {
      data.map((item2) => {
        switch (item2.lan) {
          case "UZ":
            setNameUz(item2.name);
            setNameUzEdit(item2.id);
            break;
          case "RU":
            setNameRu(item2.name);
            setNameRuEdit(item2.id);
            break;
          case "EN":
            setNameEn(item2.name);
            setNameEnEdit(item2.id);
            break;
          default:
            break;
        }
      });
    });
  }

  function deleteCategory(id) {
    setDeletingId(id);
    setDeletes(true);
  }
  function deletecategory() {
    setDeletes(false);
    AxiosCall("delete", "/navbar_categories/" + deleteingId).then((data) => {
      getCategories();
      navigate("/");
    });
  }
  function navigation(id, name) {
    setSelectedCategory({ name, id });
    navigate("/main/" + id);
  }
  return (
    <div className="admin-sider">
      <div className="add-category">
        <Button variant="contained" onClick={() => setModalvisibles(true)}>
          + Menu Qo'shish
        </Button>
      </div>
      <div className="categories">
        {isLoading&&categories.length==0?<h4>Ma'lumot mavjud emas!</h4>:

            !isLoading&&categories.length>0?(
          categories.map((item, index) => (
            <ListItem
              key={index}
              style={
                item.id === id
                  ? {
                      borderLeft: "4px solid #3366f0",
                    }
                  : {}
              }
              className="card"
            >
              <ListItemText
                primary={
                  <span onClick={() => navigation(item.id, item.name)}>
                    {item.name}
                  </span>
                }
              />
              <ButtonGroup>
                <IconButton onClick={() => editCategory(item)}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => deleteCategory(item.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </ButtonGroup>
            </ListItem>
          ))
        ) : (
          <div className="dot-spinner">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
          </div>
        )}
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "10px",
          padding: "20px 8px 10px ",
        }}
      >
        <Button
          sx={{
            padding: "8px",
            justifyContent: "start",
            paddingLeft: "25px",
            color: "#fff",
          }}
          variant="contained"
          fullWidth
          onClick={() => navigate("/sub-admins")}
          startIcon={<SupervisorAccountIcon />}
        >
          <span>Adminlar</span>
        </Button>
        <Button
          sx={{
            padding: "10px",
            color: "#FFF",
            justifyContent: "start",
            paddingLeft: "25px",
          }}
          variant="contained"
          fullWidth
          onClick={() => navigate("/edit-home-page")}
          startIcon={<HomeIcon />}
        >
          <span>Bosh sahifa</span>
        </Button>
        <Button
          sx={{
            padding: "8px",
            color: "#FFF",
            justifyContent: "start",
            paddingLeft: "25px",
          }}
          variant="contained"
          fullWidth
          onClick={() => {
            localStorage.removeItem("user");
            window.location.assign("/login");
          }}
          startIcon={<LogoutIcon />}
        >
          <span>Chiqish</span>
        </Button>
        <Rodal
          width={250}
          height={120}
          visible={deletes}
          onClose={() => setDeletes(false)}
        >
          <div className="alert-box">
            <span>O'chirilsinmi</span>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button className="yes-btn" onClick={() => deletecategory()}>
                Ha
              </button>
              <button className="no-btn" onClick={() => setDeletes(false)}>
                Yo'q
              </button>
            </div>
          </div>
        </Rodal>
      </Box>
      <Rodal
        height={300}
        visible={modalvisibles}
        onClose={() => setModalvisibles(false)}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexDirection: "column",
            width: "100%",
            padding: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <span>Uz:</span>
            <TextField
              value={nameUz}
              fullWidth
              onChange={(e) => {
                setNameUz(e.target.value);
              }}
              className="input"
              placeholder="Kategori nomi"
              type="text"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <span>En:</span>
            <TextField
              value={nameEn}
              fullWidth
              onChange={(e) => {
                setNameEn(e.target.value);
              }}
              className="input"
              placeholder="Category name"
              type="text"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <span>Ru:</span>
            <TextField
              fullWidth
              value={nameRu}
              onChange={(e) => {
                setNameRu(e.target.value);
              }}
              className="input"
              placeholder="Название категории"
              type="text"
            />
          </Box>
          <ButtonGroup
            sx={{ display: "flex", width: "100%", justifyContent: "end" }}
          >
            <Button variant="contained" onClick={addCategory}>
              Saqlash
            </Button>
          </ButtonGroup>
        </Box>
      </Rodal>
    </div>
  );
};

export default AdminSider;
