import { Button, Card, CardContent, TextField } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { db } from "../firebase";
import {
  serverTimestamp,
  addDoc,
  collection,
  updateDoc,
  doc
} from "firebase/firestore";
import { TodoContext } from "../pages/TodoContext";
import { useAuth } from "../Auth";

const TodoForm = () => {
  const inputAreaRef = useRef();
  const { currentUser } = useAuth();
  const { showAlert, todo, setTodo } = useContext(TodoContext);
  const submitHandler = async () => {
    if (todo?.hasOwnProperty("timestamp")) {
      // update todo
      const ref = doc(db, "todos", todo.id);
      await updateDoc(ref, {
        ...todo,
        timestamp: serverTimestamp()
      });
      showAlert("success", `Todo  ${todo.title} was successfully updated`);
    } else {
      // addnew todo
      const _doc = await addDoc(collection(db, "todos"), {
        ...todo,
        timestamp: serverTimestamp(),
        email: currentUser.email
      });
      setTodo({ title: "", detail: "" });
      if (_doc.id) {
        showAlert("success", `Todo with id: ${_doc.id} was saved to database`);
      }
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (!inputAreaRef.current.contains(e.target)) {
        console.log("Outside input area");
        setTodo({ title: "", detail: "" });
      } else {
        console.log("Inside input area");
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  return (
    <Card
      sx={{ mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: "#FAFAFA" }}
      ref={inputAreaRef}
    >
      <CardContent>
        <pre>{JSON.stringify(todo, null, "\t")}</pre>
        <TextField
          fullWidth
          label="Title"
          margin="normal"
          value={todo.title}
          onChange={e => setTodo({ ...todo, title: e.target.value })}
        />
        <TextField
          fullWidth
          label="Detail"
          multiline
          maxRows={4}
          margin="normal"
          value={todo.detail}
          onChange={e => setTodo({ ...todo, detail: e.target.value })}
        />
        <Button onClick={submitHandler} variant="contained" sx={{ mt: 3 }}>
          {!todo?.hasOwnProperty("timestamp") ? "Add New Todo" : "Update Todo"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TodoForm;
