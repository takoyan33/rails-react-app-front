import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FiSend } from "react-icons/fi";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { useCreateMemberMutation } from "../graphql/generated";
import TextField from "@mui/material/TextField";

function AddMember() {
  const [createMember] = useCreateMemberMutation({
    refetchQueries: ["members"],
  });
  const [fullname, setFullname] = useState("");
  const [hurigana, setHurigana] = useState("");
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [birthday, setBirthdaye] = useState("");
  const [admin, setAdmin] = useState("0");

  return (
    <div className="max-w-5xl m-auto">
      <Header />
      <p className="text-3xl font-bold">新しいメンバー登録</p>
      <p>
        <Link to="/">トップページ</Link>　＞　
        <Link to="/member/new">メンバー登録</Link>
      </p>
      <div className="my-4">
        <TextField
          id="standard-basic"
          label="名前"
          variant="standard"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div className="my-4">
        <TextField
          id="standard-basic"
          label="ふりがな"
          variant="standard"
          value={hurigana}
          onChange={(e) => setHurigana(e.target.value)}
        />
      </div>
      <div className="my-4">
        <TextField
          id="standard-basic"
          label="学年"
          variant="standard"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
      </div>
      <div className="my-4">
        <TextField
          id="standard-basic"
          label="性別"
          variant="standard"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </div>
      <div className="my-4">
        <TextField
          id="standard-basic"
          label="学部"
          variant="standard"
          value={grade}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>
      <div className="my-4">
        <TextField
          id="standard-basic"
          label="誕生日"
          variant="standard"
          value={birthday}
          onChange={(e) => setBirthdaye(e.target.value)}
        />
      </div>
      <div className="my-4">
        <Button
          variant="outlined"
          onClick={() => {
            createMember({
              variables: {
                params: {
                  fullname: fullname,
                  hurigana: hurigana,
                  department: department,
                  grade: grade,
                  gender: gender,
                  birthday: birthday,
                  admin: admin,
                },
              },
            });
            setFullname("");
            setHurigana("");
            setGrade("");
            setDepartment("");
            setBirthdaye("");
          }}
        >
          保存
        </Button>
      </div>
    </div>
  );
}

export default AddMember;
