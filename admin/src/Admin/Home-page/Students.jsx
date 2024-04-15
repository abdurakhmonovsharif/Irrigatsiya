import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  TextField,
  Box,
  Typography,
  ButtonGroup,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEffect } from "react";
import Rodal from "rodal";
import EditIcon from "@mui/icons-material/Edit";
import AxiosCall from "../../AxiosCall/AxiosCall";

export default function Students() {
  const [studentCount, setStudentCount] = useState("");
  const [id, setId] = useState(null);
  const [ord, setOrd] = useState(null);
  const [selectName, setSelectName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [regions, setRegions] = useState([]);

  function getStudent() {
    AxiosCall("get", "/regional_students").then((data) => setRegions(data));
  }

  useEffect(() => {
    getStudent();
  }, []);

  function openModal({ name, id, studentCount, ord }) {
    setModalVisible(true);
    setSelectName(name);
    setStudentCount(studentCount);
    setId(id);
    setOrd(ord);
  }

  function editStudent(e) {
    e.preventDefault();
    AxiosCall("put", "/regional_students/" + id, {
      name: selectName,
      studentCount,
      ord,
    }).then((res) => {
      getStudent();
      setModalVisible(false);
      setSelectName("");
      setStudentCount("");
      setId("");
    });
  }

  return (
    <div className="students-container">
      <h6>Talabalar</h6>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Viloyat nomi</TableCell>
              <TableCell>O'quvchilar</TableCell>
              <TableCell>O'zgartirish</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {regions.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.studentCount} ta</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => openModal(item)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Rodal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        width={500}
        height={200}
      >
        <form
          onSubmit={editStudent}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <Typography>{selectName}</Typography>
          <TextField
            type="text"
            label="Studentlar sonini kiriting"
            value={studentCount}
            onChange={(e) => setStudentCount(e.target.value)}
          />
          <ButtonGroup sx={{ display: "flex", justifyContent: "end" }}>
            <Button type="submit" variant="contained">
              Saqlash
            </Button>
          </ButtonGroup>
        </form>
      </Rodal>
    </div>
  );
}
