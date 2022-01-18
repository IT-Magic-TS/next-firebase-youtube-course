// npm install moment - for time
import moment from "moment";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { TodoContext } from "../pages/TodoContext";
import { useRouter } from "next/router";

function Todo({ id, timestamp, title, detail }) {
  const { setTodo } = useContext(TodoContext);
  const { showAlert } = useContext(TodoContext);
  const router = useRouter();

  const deleteHandler = async e => {
    e.stopPropagation();
    const deletedItem = await deleteDoc(doc(db, "todos", id));
    showAlert("error", `Todo ${title} deleted successfully!`);
  };

  const seeMore = e => {
    e.stopPropagation();
    router.push(`/todos/${id}`);
  };

  return (
    <ListItem
      onClick={() => setTodo({ id, title, detail, timestamp })}
      sx={{ mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: "#FAFAFA" }}
      secondaryAction={
        <>
          <IconButton onClick={deleteHandler}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={seeMore}>
            <MoreVertIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText
        primary={title}
        secondary={moment(timestamp).format("MMMM do, yyyy")}
      />
    </ListItem>
  );
}

export default Todo;
