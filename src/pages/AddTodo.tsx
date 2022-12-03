import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Header } from "../components/Header";
import { FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { apiKey } from "../components/env";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { Input, Button } from "@mantine/core";
import { Oval } from "react-loader-spinner";
import { Center } from "@mantine/core";

const items = [
  { title: "トップページ", href: "/" },
  { title: "ニュース一覧", href: "/todos/" },
  { title: "ニュース投稿", href: "/todos/new" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    <Link to={item.href}>{item.title}</Link>
  </Anchor>
));

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
    <div className="flex">
      <Header />
      <div className="max-w-6xl m-auto m- mt-12">
        <p className="text-3xl font-bold">新しいニュース</p>

        <div className="my-4">
          <Breadcrumbs>{items}</Breadcrumbs>
        </div>

        <Input.Wrapper
          id="input-demo"
          withAsterisk
          label="ニュース内容"
          description=""
          error=""
        >
          <Input
            type="text"
            required
            value={todo.name}
            onChange={handleInputChange}
            name="name"
          />
        </Input.Wrapper>
        <div className="my-4">
          <Button
            variant="outline"
            color="cyan"
            onClick={saveTodo}
            disabled={!todo.name || /^\s*$/.test(todo.name)}
          >
            投稿する
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
