import { Button, ListItem, ListItemText } from "@mui/material";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import React from "react";
import { db } from "./firebase";

export default function TodoListItem({ todo, time, addtime,  progres, id }) {
  function usuwanie() {
    deleteDoc(doc(db, "todos", id));
  }

  function ukonczone() {
    const docRef = doc(db, "todos", id);

    updateDoc(docRef, {
      progres: !progres,
    });
  }

  return (
    <div style={{ display: " flex" }}>
      <ListItem>
        <ListItemText
          primary={todo + time}
          secondary={progres ? "zrobione" : "niezrobine"}
        />
      </ListItem>
      <Button onClick={ukonczone}>Zrobione</Button>
      <Button onClick={usuwanie}>Usuń</Button>
      {/* <p>{todo}</p> */}
    </div>
  );
}
