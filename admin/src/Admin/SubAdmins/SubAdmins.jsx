import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import Rodal from "rodal";
import "./SubAdmins.scss";
import AxiosCall, { BASE_URL } from "../../AxiosCall/AxiosCall";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LockResetIcon from "@mui/icons-material/LockReset";
import EditIcon from "@mui/icons-material/Edit";
const SubAdmins = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [users, setUsers] = useState([]);
  const [Isedit, setIsEdit] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof Isedit === "object") {
      setFirstname(Isedit.firstname);
      setUsername(Isedit.username);
      setLastname(Isedit.lastname);
    }
  }, [Isedit]);

  function generatePassword() {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@$*&?//";
    let pass = "";
    for (let i = 0; i < 10; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  }
  function getAdmins() {
    const token = Cookies.get("ac_t");
    axios
      .get(BASE_URL + "/user", {
        headers: {
          token: token,
        },
      })
      .then(({ data }) => {
        setUsers(data);
      })
      .catch(() => {
        toast.error("Sizga ruxsat berilmagan");
        setError(true);
      });
  }
  useEffect(() => {
    getAdmins();
  }, []);
  function saveUser() {
    if (Isedit === "no") {
      if (!username || !firstname || !lastname || !password)
        return toast.error(`Ma'lumotlar to'ldirilmagan`);
      AxiosCall("post", "/user", {
        firstname,
        username,
        password,
        lastname,
      }).then((data) => {
        toast.success(`Muvaffaqiyatli o'zgartirildi`);
        getAdmins();
        setFirstname("");
        setLastname("");
        setPassword("");
        setUsername("");
      });
    } else {
      if (!username || !firstname || !lastname)
        return toast.error(`Ma'lumotlar to'ldirilmagan`);
      AxiosCall("put", "/user/" + Isedit.id, {
        firstname,
        username,
        password: password === "" ? null : password,
        lastname,
      }).then((data) => {
        toast.success(`Muvaffaqiyatli o'zgartirildi`);
        getAdmins();
        setFirstname("");
        setLastname("");
        setPassword("");
        setUsername("");
        setIsEdit();
      });
    }
  }
  function deletes() {
    AxiosCall("delete", "/user/" + modalVisible).then((data) => {
      toast.success("Muvaffaqiyatli o'chirildi");
      getAdmins();
      setModalVisible(false);
    });
  }

  function closeEditModal() {
    setFirstname("");
    setLastname("");
    setPassword("");
    setUsername("");
    setIsEdit(false);
  }
  return error ? null : (
    <div
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        maxHeight: "calc(100vh - 1vh)",
        overflowY: "auto",
      }}
    >
      <div className="add-button">
        <Button variant="contained" onClick={() => setIsEdit("no")}>
          + Admin qo'shish
        </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Full name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.firstname}</TableCell>
                <TableCell>
                  <ButtonGroup>
                    <Button onClick={() => setModalVisible(item.id)}>
                      <DeleteIcon color="error" />
                    </Button>
                    <Button onClick={() => setIsEdit(item)}>
                      <EditIcon />
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Rodal
        width={500}
        height={400}
        visible={Isedit}
        onClose={() => closeEditModal()}
      >
        <Box
          sx={{
            display: "flex",
            padding: "20px",
            flexDirection: "column",
            gap: "13px",
          }}
        >
          <TextField
            fullWidth
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            label="UserName"
            variant="outlined"
          />
          <TextField
            fullWidth
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            label="FirstName"
            variant="outlined"
          />
          <TextField
            fullWidth
            type="text"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            label="LastName"
            variant="outlined"
          />
          <Box sx={{ display: "flex", width: "100%", gap: "6px" }}>
            <TextField
              fullWidth
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              label="Password"
              variant="outlined"
            />
            <IconButton onClick={generatePassword} size="large">
              <LockResetIcon />
            </IconButton>
          </Box>
          <Button variant="contained" onClick={() => saveUser()}>
            Saqlash
          </Button>
        </Box>
      </Rodal>
      <Rodal
        width={250}
        height={120}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <div className="alert-box">
          <span>O'chirilsinmi?</span>
          <div className="btns">
            <button className="yes-btn" onClick={() => deletes()}>
              Ha{" "}
            </button>
            <button className="no-btn" onClick={() => setModalVisible(false)}>
              Yo'q
            </button>
          </div>
        </div>
      </Rodal>
    </div>
  );
};

export default SubAdmins;
