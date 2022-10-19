import "./todo.css";
import { Button, ListItem, ListItemText } from "@mui/material";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import React from "react";
import { db } from "./firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CloseIcon from '@mui/icons-material/Close';

export default function TodoListItem({ todo, time, addtime, progres, id }) {
  function usuwanie() {
    deleteDoc(doc(db, "todos", id));
  }

  function ukonczone() {
    const docRef = doc(db, "todos", id);

    updateDoc(docRef, {
      progres: !progres,
    });
  }

  const serwvertime = time.toDate().toLocaleDateString();

  return (
    <div className="todo-item-contener">
      <ListItem className="ListItem">
        <ListItemText
          className="ListItemText"
          primary={todo + " - " + serwvertime}
          secondary={
            progres ? (
              <span className="zrobione">Zrobione</span>
            ) : (
              <span className="niezrobione">Niezrobione</span>
            )
          }
        />
      </ListItem>
      <div className="button-conteiner">
        <Button
          className="button-list-item"
          color="success"
          variant="outlined"
          onClick={ukonczone}
        >
          
          {progres ?  <CloseIcon></CloseIcon> : <TaskAltIcon></TaskAltIcon> }
        </Button>
        <Button
          className="button-list-item"
          color="error"
          variant="outlined"
          onClick={usuwanie}
        >
          <DeleteIcon className="Icon"></DeleteIcon>
          Usuń
        </Button>
      </div>
    </div>
  );
}
