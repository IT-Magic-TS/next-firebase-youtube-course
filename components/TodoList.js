import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  onSnapshot,
  orderBy,
  collection,
  query,
  where
} from "firebase/firestore";
import Todo from "./Todo";
import { useAuth } from "../Auth";

function TodoList({ todosProps }) {
  const [todos, setTodos] = useState([]);
  const { currentUser, setLoading } = useAuth();

  useEffect(() => {
    setTodos(JSON.parse(todosProps));
  }, []);

  // useEffect(() => {
  //   const collectionRef = collection(db, "todos");
  //   const q = query(
  //     collectionRef,
  //     where("email", "==", currentUser?.email),
  //     orderBy("timestamp", "desc")
  //   );

  //   const unsubscribe = onSnapshot(q, querySnapshot => {
  //     setTodos(
  //       querySnapshot.docs.map(doc => ({
  //         ...doc.data(),
  //         id: doc.id,
  //         timestamp: doc.data().timestamp?.toDate().getTime()
  //       }))
  //     );
  //   });
  //   // setLoading(false);
  //   return unsubscribe;
  // }, []);

  return (
    <div>
      {todos.map(item => (
        <Todo
          key={item.id}
          title={item.title}
          timestamp={item.timestamp}
          id={item.id}
          detail={item.detail}
        />
      ))}
    </div>
  );
}

export default TodoList;
