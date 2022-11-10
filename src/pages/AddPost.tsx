import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FiSend } from "react-icons/fi";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import {
  useBooksQuery,
  useCreateBookMutation,
  useCreateMemberMutation,
} from "../graphql/generated";
import TextField from "@mui/material/TextField";

function AddPost(props: any) {
  const { data: { books = [] } = {} } = useBooksQuery();
  const [createBook] = useCreateBookMutation({ refetchQueries: ["books"] });
  const [createMember] = useCreateMemberMutation({
    refetchQueries: ["members"],
  });
  const [title, setTitle] = useState("");
  const [fullname, setFullname] = useState("");
  const [hurigana, setHurigana] = useState("");
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [birthday, setBirthdaye] = useState("");
  const [admin, setAdmin] = useState("");

  return (
    <div className="flex">
      <Header />
      <div className="max-w-5xl m-auto">
        <p className="text-3xl font-bold">新しいメンバー登録</p>
        <p>
          <Link to="/">トップページ</Link>　＞　
          <Link to="/posts/new">メンバー登録</Link>
        </p>
        <div>
          <TextField
            id="standard-basic"
            label="名前"
            variant="standard"
            value={fullname}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            label="ふりがな"
            variant="standard"
            value={hurigana}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <TextField
          id="standard-basic"
          label="学年"
          variant="standard"
          value={grade}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <Button
            variant="outlined"
            onClick={() => {
              createMember({
                variables: {
                  params: {
                    fullname: fullname,
                    hurigana: hurigana,
                    department: department,
                    grade: fullname,
                    gender: gender,
                    birthday: birthday,
                    admin: admin,
                  },
                },
              });
              setTitle("");
            }}
          >
            保存
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
