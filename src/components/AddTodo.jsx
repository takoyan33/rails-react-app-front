import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { FiSend } from "react-icons/fi";
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

// toast.configure();

function AddTodo(props) {
  const initialTodoState = {
    id: null,
    name: "",
    is_completed: false,
  };

  console.log(props);

  const [todo, setTodo] = useState(initialTodoState);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const saveTodo = () => {
    var data = {
      name: todo.name,
    };

    axios
      .post("http://localhost:3001/api/v1/todos", data)
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
    <>
      <h1>New Todo</h1>
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
    </>
  );
}

export default AddTodo;
