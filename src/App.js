import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";

import { db } from "./firebase";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import TodoListItem from "./Todo";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function App() {
  const [todos, setTodos] = React.useState([]);

  const [todoInput, setTodoInput] = useState("");

  const [timeValue, settimeValue] = React.useState("");

  React.useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  function addTask(e) {
    e.preventDefault();

    addDoc(collection(db, "todos"), {
      todo: todoInput,
      progres: false,
      time: timeValue ? timeValue : serverTimestamp(),
      addtime: serverTimestamp(),
    });

    setTodoInput("");
    settimeValue("");
  }


  function costomAlert (){
    alert("Musisz wprowadzić zadanie i datę");
  }



  return (
    <div className="app-conteiner">
      <h1>Aplikacja Zadaniowa</h1>
      <h5>z wykorzystaniem firebase</h5>
      <form className="formconteiner">
        <TextField
          className="textfield-todo"
          id="standard-basic"
          label="Wprowadź zadanie..."
          value={todoInput}
          onChange={(e) => {
            setTodoInput(e.target.value);
          }}
          variant="standard"
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            className="datepickertodo"
            label="Deadline"
            value={timeValue}
            onChange={(newValue) => {
              settimeValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        {timeValue && todoInput ? (
          <Button
            className="button-submit"
            type="submit"
            variant="contained"
            onClick={addTask}
          >
            Dodaj
          </Button>
        ) : (
          <Button
            className="button-submit"
            type="submit"
            variant="contained"
            color="error"
            onClick={costomAlert}
          >
            Wprowadź datę i zadanie
          </Button>
        )}
      </form>
      <div>
        {todos
          .sort((a, b) => (a.time > b.time ? 1 : -1))
          .map((todo) => (
            <TodoListItem
              todo={todo.todo}
              time={todo.time ? todo.time : null}
              addtime={todo.addtime}
              progres={todo.progres}
              id={todo.id}
            />
          ))}
      </div>
    </div>
  );
}

export default App;

//
