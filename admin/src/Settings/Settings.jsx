import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  ButtonGroup,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { styled } from "@mui/system";
import userImage from "../Image/user.png";
import AxiosCall from "../AxiosCall/AxiosCall";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: 100,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: 0,
}));

const Settings = ({ user, setUser }) => {
  const [img, setImg] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showpass, setShowpass] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setUsername(user.username);
    }
  }, [user]);

  function handleSave() {
    const data = {
      firstname,
      lastname,
      username,
      password: password === "" ? null : password,
    };
    AxiosCall("put", `/user/${user.id}`, data)
      .then(() => {
        setUser(null);
        navigate("/login");
      })
      .catch((e) => {
        toast.error("Xatolik");
      });
  }

  return (
    <Box >
      <StyledCard>
        <StyledCardMedia component="img" src={userImage} alt="" width={100} />
        <Typography variant="h6" component="h1">
          {user?.lastname} {user?.firstname}
        </Typography>
      </StyledCard>

      <StyledCard>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            gap:"9px"
          }}
        >
          <StyledTextField
            value={firstname}
            fullWidth
            onChange={(e) => setFirstname(e.target.value)}
            label="Ism"
            variant="outlined"
          />
          <StyledTextField
            value={lastname}
            fullWidth
            onChange={(e) => setLastname(e.target.value)}
            label="Familya"
            variant="outlined"
          />
          <StyledTextField
            value={username}
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            label="Foydalanuvchi nomi"
            variant="outlined"
          />
          <Box sx={{ display: "flex", gap: "6px" }}>
            <StyledTextField
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Parol"
              type={showpass ? "text" : "password"}
              variant="outlined"
            />
            <IconButton onClick={() => setShowpass(!showpass)}>
              {showpass ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
            </IconButton>
          </Box>
          <ButtonGroup sx={{ display: "flex", justifyContent: "end" }}>
            <StyledButton
              onClick={handleSave}
              variant="contained"
              color="primary"
            >
              Saqlash
            </StyledButton>
          </ButtonGroup>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default Settings;
