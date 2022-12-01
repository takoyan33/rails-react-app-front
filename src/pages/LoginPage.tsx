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
import { Breadcrumbs, Anchor } from "@mantine/core";
import {
  CiFaceSmile,
  CiUser,
  CiHome,
  CiAt,
  CiCalendarDate,
} from "react-icons/ci";

const items = [
  { title: "トップページ", href: "/" },
  { title: "クラブのログイン", href: "/login" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    <Link to={item.href}>{item.title}</Link>
  </Anchor>
));

function AddClub() {
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
  const [birthday, setBirthday] = useState("");
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex">
      <Header />
      <ToastContainer />
      <div className="max-w-6xl m-auto mt-12">
        <p className="text-3xl font-bold">クラブのログイン</p>
        <div className="my-4">
          <Breadcrumbs>{items}</Breadcrumbs>
        </div>

        <div className="my-4">
          <Input.Wrapper
            id="input-demo"
            withAsterisk
            label="メールアドレス"
            description=""
            error=""
          >
            <Input
              icon={<CiAt />}
              placeholder="メールアドレス"
              type="email"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </Input.Wrapper>
        </div>

        <div className="my-4">
          <Input.Wrapper
            id="input-demo"
            withAsterisk
            label="パスワード"
            description=""
            error=""
          >
            <Input
              icon={<CiAt />}
              placeholder="パスワード"
              type="password"
              value={hurigana}
              onChange={(e) => setHurigana(e.target.value)}
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
                    profilepic: "aaa",
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
              setBirthday("");
              navigate("/");
            }}
          >
            ログインする
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddClub;
