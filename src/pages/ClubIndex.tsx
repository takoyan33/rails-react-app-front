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
  { title: "サークルについて", href: "/club" },
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
        <p className="text-3xl font-bold">クラブについて</p>
      </div>
    </div>
  );
}

export default AddClub;
