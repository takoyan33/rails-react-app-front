import client from "./client";
import { Todo } from "../../interfaces/index";

// todo一覧を取得
export const getTodos = () => {
  return client.get("/todolists");
};

// todoを新規作成
export const createTodo = (data: Todo) => {
  return client.post("/todolists", data);
};

// todoを削除
export const deleteTodo = (id: number) => {
  return client.delete(`/todolists/${id}`);
};

// todoを更新
export const updateTodo = (id: number, data: Todo) => {
  return client.patch(`/todolists/${id}`, data);
};
