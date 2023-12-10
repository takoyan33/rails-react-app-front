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

function EditNews(props: any) {
  const initialNewsState = {
    news: {
      id: null,
      title: "",
      body: "",
    },
  };
  const [currentNews, setCurrentNews] = useState(initialNewsState);
  const [ID, setID] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);
  console.log(`${apiKey}/${id}`);

  const getNews = (id) => {
    axios
      .get(`${apiKey}/${id}`)
      .then((resp) => {
        setCurrentNews(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getNews(id);
  }, []);

  const handleInputChange = (event: any) => {
    const { title, value } = event.target;
    setCurrentNews({ ...currentNews, [title]: value });
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
      setCurrentNews(resp.data);
    });
    console.log(val);
  };

  const updateNews = () => {
    axios
      .patch(`${apiKey}/${currentNews.id}`, currentNews)
      .then(() => {
        alert("編集が完了しました");
        navigate("/news");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteNews = () => {
    const sure = window.confirm("削除しても大丈夫ですか?");
    if (sure) {
      axios
        .delete(`${apiKey}/${currentNews.id}`)
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
              defaultValue={currentNews.title}
              onChange={handleInputChange}
            />

            <div>
              <span>カテゴリ</span>
              <br />
              {/* <CurrentStatus>
                {currentNews.is_completed ? "お知らせ" : "イベント"}
              </CurrentStatus> */}
            </div>
          </div>

          <span className="m-4">
            <Button variant="outline" color="cyan" onClick={updateNews}>
              更新
            </Button>
          </span>
          <span className="m-4">
            <Button variant="outline" color="cyan" onClick={deleteNews}>
              削除
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default EditNews;
