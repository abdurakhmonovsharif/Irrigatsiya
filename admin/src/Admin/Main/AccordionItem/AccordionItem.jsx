import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./AccordionItem.scss";
import {
  Box,
  Button,
  ButtonBase,
  ButtonGroup,
  IconButton,
} from "@mui/material";

function AccordionItem({
  deleteInnerChild,
  editInnerChild,
  startPos,
  editInnerAdd,
  navigate,
  setCategoryIndex,
  setSelectedCategory,
  item,
  editInner,
  deleteInner,
  deletes2,
  modalvisible,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const paddingLeft = (startPos - 2) * 30 + 16;
  return (
    <li className="accordion-item" key={item.id}>
      <input
        checked={isOpen}
        onChange={(e) => {
          if (!modalvisible && !deletes2) {
            setIsOpen(e.target.checked);
          }
        }}
        id={item.id}
        type="checkbox"
        hidden
      />
      <label style={{ paddingLeft }} htmlFor={item.id}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <ButtonGroup>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                setSelectedCategory(item);
                setCategoryIndex(startPos);
                localStorage.setItem("c_i", item.id);
                navigate(`/main/${item.id}/content`);
              }}
            >
              Kontentlar
            </Button>
              {startPos!=4&&
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                editInnerAdd(item, startPos + 1);
              }}
            >
              + Qo'shish{" "}
            </Button>}
          </ButtonGroup>
          <ButtonGroup>
            <IconButton
              color="inherit"
              onClick={() => {
                if (startPos == 2) {
                  editInner(item);
                } else {
                  editInnerChild(item, startPos);
                }
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                if (startPos == 2) {
                  deleteInner(item.id);
                } else {
                  deleteInnerChild(item.id, startPos);
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ButtonGroup>
        </Box>
        <span>
          {item.innerCategories?.length > 0 && (
            <FontAwesomeIcon className="rotatible-icon" icon={faAngleRight} />
          )}
          {item.name}
        </span>
      </label>

      {item.innerCategories?.length > 0 && (
        <ul className="group-list">
          {item.innerCategories.map((itemChild) => (
            <AccordionItem
              deleteInnerChild={deleteInnerChild}
              editInnerChild={editInnerChild}
              setSelectedCategory={setSelectedCategory}
              setCategoryIndex={setCategoryIndex}
              deleteInner={deleteInner}
              editInner={editInner}
              item={itemChild}
              navigate={navigate}
              editInnerAdd={editInnerAdd}
              key={itemChild.id}
              modalvisible={modalvisible}
              deletes2={deletes2}
              startPos={startPos + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default AccordionItem;
