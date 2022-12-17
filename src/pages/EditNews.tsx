import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Header } from "../components/Header";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { apiKey } from "../components/env";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { Link, Router } from "react-router-dom";
import { Input, Button } from "@mantine/core";

const CurrentStatus = styled.div`
  font-size: 19px;
  margin: 8px 0 12px 0;
  font-weight: bold;
`;

const items = [
  { title: "トップページ", href: "/" },
  { title: "ニュース一覧", href: "/news/" },
  { title: "ニュース投稿", href: "/news/new" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    <Link to={item.href}>{item.title}</Link>
  </Anchor>
));

function EditTodo(props: any) {
  const initialNewsState = {
    id: null,
    title: "",
    body: "",
  };
  const [currentTodo, setCurrentTodo] = useState(initialNewsState);
  const [ID, setID] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);
  console.log(`${apiKey}/${id}`);

  const getTodo = (id) => {
    axios
      .get(`${apiKey}/${id}`)
      .then((resp) => {
        setCurrentTodo(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTodo(id);
  }, []);

  console.log(currentTodo.title);
  console.log(currentTodo);

  const handleInputChange = (event: any) => {
    const { title, value } = event.target;
    setCurrentTodo({ ...currentTodo, [title]: value });
    //currenttodoのnameをセットする
  };

  const updateIsCompleted = (val: any) => {
    var data = {
      id: val.id,
      title: val.title,
      is_completed: !val.is_completed,
    };
    axios.patch(`${apiKey}/${val.id}`, data).then((resp) => {
      alert("更新しました");
      setCurrentTodo(resp.data);
    });
    console.log(val);
  };

  const updateTodo = () => {
    axios
      .patch(`${apiKey}/${currentTodo.id}`, currentTodo)
      .then((response) => {
        alert("編集が完了しました");
        navigate("/todos");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTodo = () => {
    const sure = window.confirm("削除しても大丈夫ですか?");
    if (sure) {
      axios
        .delete(`${apiKey}/${currentTodo.id}`)
        .then((resp) => {
          console.log(resp.data);
          alert("削除しました");
          navigate("/todos");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div className="flex">
      <Header />

      <div className="max-w-7xl m-auto mt-10">
        <p className="text-3xl font-bold">ニュースを編集する</p>
        <div>
          <div className="my-4">
            <Breadcrumbs>{items}</Breadcrumbs>
          </div>
          <div>
            <label htmlFor="name">現在のニュースタイトル</label>

            <Input
              type="text"
              id="name"
              name="title"
              value={currentTodo.title}
              onChange={handleInputChange}
            />

            <div>
              <span>カテゴリ</span>
              <br />
              {/* <CurrentStatus>
                {currentTodo.is_completed ? "お知らせ" : "イベント"}
              </CurrentStatus> */}
            </div>
          </div>

          <span className="m-4">
            <Button variant="outline" color="cyan" onClick={updateTodo}>
              更新
            </Button>
          </span>
          <span className="m-4">
            <Button variant="outline" color="cyan" onClick={deleteTodo}>
              削除
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default EditTodo;
