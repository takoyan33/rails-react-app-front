import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FiSend } from "react-icons/fi";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { useBooksQuery, useCreateBookMutation } from "../graphql/generated";
import TextField from "@mui/material/TextField";


function AddPost(props: any) {
  const { data: { books = [] } = {} } = useBooksQuery();
  const [createBook] = useCreateBookMutation({ refetchQueries: ["books"] });
  const [title, setTitle] = useState("");

  return (
    <div className="max-w-5xl m-auto">
      <Header />
      <br></br>
      <p className="text-3xl font-bold">新しいメンバー登録</p>
      <br></br>
      <p>
        <Link to="/">トップページ</Link>　＞　
        <Link to="/posts/new">メンバー登録</Link>
      </p>
      <br></br>
      <TextField
        id="standard-basic"
        label="名前"
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br></br>
      <br></br>
      <TextField
        id="standard-basic"
        label="ふりがな"
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br></br>
      <br></br>
      <TextField
        id="standard-basic"
        label="名前"
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br></br>
      <br></br>
      <Button
        variant="outlined"
        onClick={() => {
          createBook({ variables: { params: { title: title } } });
          setTitle("");
        }}
      >
        保存
      </Button>
    </div>
  );
}

export default AddPost;
