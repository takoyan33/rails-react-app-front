import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../components/Header";
import { FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { apiKey } from "../components/env";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";

const InputAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const InputName = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 2px 7px;
`;

const Button = styled.button`
  font-size: 20px;
  border: none;
  border-radius: 3px;
  margin-left: 10px;
  padding: 2px 10px;
  background: #1e90ff;
  color: #fff;
  text-align: center;
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    cursor: default;
  `}
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`;

function AddTodo(props: any) {
  const initialTodoState = {
    id: null,
    name: "",
    is_completed: false,
  };

  console.log(props);

  const [todo, setTodo] = useState(initialTodoState);
  const navigate = useNavigate();
  // const railsurl = "https://rails-react-app-backend.herokuapp.com/api/v1/todos";

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  // const railsurl = process.env.REACT_APP_API_URL;

  const saveTodo = () => {
    var data = {
      name: todo.name,
    };

    console.log(apiKey);

    axios
      .post(apiKey, data)
      .then((resp) => {
        setTodo({
          id: resp.data.id,
          name: resp.data.name,
          is_completed: resp.data.is_completed,
        });
        alert("追加しました");
        navigate("/todos");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="max-w-5xl m-auto">
      <Header />
      <p className="text-3xl font-bold">新しいニュース</p>
      <br></br>
      <p>
        <Link to="/">トップページ</Link>　＞　
        <Link to="/todos/">ニュース一覧</Link>　＞　
        <Link to="/todos/new">ニュース投稿</Link>
      </p>
      <br></br>
      <InputAndButton>
        <InputName
          type="text"
          required
          value={todo.name}
          onChange={handleInputChange}
          name="name"
        />
        <Button
          onClick={saveTodo}
          disabled={!todo.name || /^\s*$/.test(todo.name)}
        >
          <Icon>
            <FiSend />
          </Icon>
        </Button>
      </InputAndButton>
    </div>
  );
}

export default AddTodo;
