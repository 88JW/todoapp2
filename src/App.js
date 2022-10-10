import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { db } from "./firebase";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import TodoListItem from "./Todo";

function App() {
  const [todos, setTodos] = React.useState([]);

  const [todoInput, setTodoInput] = useState("");

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
      addtime: serverTimestamp(),
    });

    setTodoInput("");
  }

  return (
    <div>
      <h1>Test Aplikacji 2</h1>
      <form>
        <TextField
          id="standard-basic"
          label="Wprowadź zadanie..."
          value={todoInput}
          onChange={(e) => {
            setTodoInput(e.target.value);
          }}
          variant="standard"
        />
        <Button type="submit" variant="contained" onClick={addTask}>
          Dodaj
        </Button>
      </form>
      <div>
        {todos.map((todo) => (
          <TodoListItem todo={todo.todo} progres={todo.progres} id={todo.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
