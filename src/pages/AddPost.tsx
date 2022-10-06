import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../components/Header";
import { FiSend } from "react-icons/fi";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";

function AddPost(props: any) {
  return (
    <div className="max-w-5xl m-auto">
      <Header />
      <p className="text-3xl font-bold">新しいAPI記事</p>
    </div>
  );
}

export default AddPost;
