import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Header } from "../components/Header";
import { FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { ToastContainer, toast } from "react-toastify";
import { apiKey } from "../components/env";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";

function AboutPage(props: any) {
  return (
    <div className="flex">
      <Header />
      <ToastContainer />
      <div className="max-w-6xl m-auto mt-12">
        <p className="text-3xl font-bold">About</p>
        <p>このサイトはメンバー管理アプリです</p>
      </div>
    </div>
  );
}

export default AboutPage;
