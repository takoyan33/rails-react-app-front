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
  { title: "ニュース一覧", href: "/news/" },
  { title: "ニュース投稿", href: "/news/new" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    <Link to={item.href}>{item.title}</Link>
  </Anchor>
));

function AddNews(props: any) {
  const initialNewsState = {
    id: null,
    title: "",
    body: "aaa",
  };

  console.log(props);

  const [news, setNews] = useState(initialNewsState);
  const navigate = useNavigate();
  // const railsurl = "https://rails-react-app-backend.herokuapp.com/api/v1/Newss";

  const handleInputChange = (event: any) => {
    const { title, value } = event.target;
    setNews({ ...news, [title]: value });
    console.log(news);
  };

  const saveNews = () => {
    var data = {
      title: news.title,
      body: news.body,
    };
    console.log(apiKey);
    axios
      .post(apiKey, data)
      .then((resp) => {
        setNews({
          id: resp.data.id,
          title: resp.data.title,
          body: resp.data.body,
        });
        alert("追加しました");
        navigate("/newss");
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
            value={news.title}
            onChange={handleInputChange}
            title="title"
          />
        </Input.Wrapper>
        <div className="my-4">
          <Button
            variant="outline"
            color="cyan"
            onClick={saveNews}
            disabled={!news.title || /^\s*$/.test(news.title)}
          >
            投稿する
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddNews;
