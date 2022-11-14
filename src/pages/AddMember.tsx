import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Header } from "../components/Header";
import { Link, Router } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { useMembersQuery, useCreateMemberMutation } from "../graphql/generated";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input, Button } from "@mantine/core";

function AddMember() {
  const notify = () => toast("メンバー登録できました！");
  const [createMember] = useCreateMemberMutation({
    refetchQueries: ["members"],
  });
  const { data: { members = [] } = {} } = useMembersQuery();
  console.log(members);
  const [fullname, setFullname] = useState("");
  const [hurigana, setHurigana] = useState("");
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [birthday, setBirthdaye] = useState("");
  const [admin, setAdmin] = useState("0");
  const navigate = useNavigate();

  return (
    <div className="flex">
      <Header />
      <ToastContainer />
      <div className="max-w-6xl m-auto mt-12">
        <p className="text-3xl font-bold">新しいメンバー登録</p>
        <p>
          <Link to="/">トップページ</Link>　＞　
          <Link to="/member/new">メンバー登録</Link>
        </p>

        <div className="my-4">
          <Input.Wrapper
            id="input-demo"
            withAsterisk
            label="名前"
            description=""
            error=""
          >
            <Input
              placeholder="名前"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </Input.Wrapper>
        </div>
        <div className="my-4">
          <Input.Wrapper
            id="input-demo"
            withAsterisk
            label="ふりがな"
            description=""
            error=""
          >
            <Input
              placeholder="ふりがな"
              value={hurigana}
              onChange={(e) => setHurigana(e.target.value)}
            />
          </Input.Wrapper>
        </div>
        <div className="my-4">
          <Input.Wrapper
            id="input-demo"
            withAsterisk
            label="名前"
            description=""
            error=""
          >
            <Input
              placeholder="学年"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </Input.Wrapper>
        </div>
        <div className="my-4">
          <Input.Wrapper
            id="input-demo"
            withAsterisk
            label="性別"
            description=""
            error=""
          >
            <Input
              placeholder="性別"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </Input.Wrapper>
        </div>
        <div className="my-4">
          <Input.Wrapper
            id="input-demo"
            withAsterisk
            label="学部"
            description=""
            error=""
          >
            <Input
              placeholder="学部"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </Input.Wrapper>
        </div>
        <div className="my-4">
          <Input.Wrapper
            id="input-demo"
            withAsterisk
            label="誕生日"
            description=""
            error=""
          >
            <Input
              placeholder="誕生日"
              type="date"
              value={birthday}
              onChange={(e) => setBirthdaye(e.target.value)}
            />
          </Input.Wrapper>
        </div>
        <div className="my-4 text-center m-auto">
          <Button
            variant="outline"
            color="cyan"
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
              notify();
              setFullname("");
              setHurigana("");
              setGrade("");
              setGender("");
              setDepartment("");
              setBirthdaye("");
              navigate("/");
            }}
          >
            保存
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddMember;
