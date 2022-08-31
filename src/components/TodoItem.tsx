import React, { useState } from "react";
import { deleteTodo } from "../lib/api/todos";
import { updateTodo } from "../lib/api/todos";
import { Todo } from "../interfaces/index";
import { Link } from "react-router-dom";

interface TodoItemProps {
  todo: Todo;
  setTodos: Function;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, setTodos }) => {
  const [title, setTitle] = useState<string>("");
  const [updatetodo, setUpdattodo] = useState("");

  /*todoを削除*/
  const handleDeleteTodo = async (id: number) => {
    try {
      const res = await deleteTodo(id);
      console.log(res);

      if (res?.status === 200) {
        setTodos((prev: Todo[]) => prev.filter((todo: Todo) => todo.id !== id));
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr>
      <td>{todo.title}</td>
      <td>
        <button onClick={() => handleDeleteTodo(todo.id || 0)}>削除する</button>
        {/* <button onClick={() => handleUpdateTodo(todo.id || 0)}>更新する</button> */}
        <Link to={`/${todo.id}/edit`}>
          <button>編集する</button>
        </Link>
      </td>
    </tr>
  );
};
