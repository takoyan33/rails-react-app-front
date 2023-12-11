import React, { useState, useEffect } from "react";

import { Header } from "../../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import EditTodo from "./EditNews";
import { usePost } from "../fetch/usePost";
import { apiKey } from "../../components/env";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { Input, Button } from "@mantine/core";
import { Timeline, Text } from "@mantine/core";
import { Oval } from "react-loader-spinner";
import { Center } from "@mantine/core";

const items = [
  { title: "トップページ", href: "/" },
  { title: "ニュース一覧", href: "/news/" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    <Link to={item.href}>{item.title}</Link>
  </Anchor>
));

const RailsPage = () => {
  const [news, setNews] = useState([]);
  const [searchName, setSearchName] = useState("");
  const { data, isLoading, isError } = usePost();
  useEffect(() => {
    axios
      .get(apiKey)
      .then((resp) => {
        setNews(resp.data);
        console.log(news);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (isLoading)
    return (
      <div className="mt-20">
        <Center>
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass="margin: 0 auto;"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </Center>
      </div>
    );
  if (isError)
    return (
      <p className="text-center mt-30">{isError.message}エラーが出ました</p>
    );

  const removeAllTodos = () => {
    const sure = window.confirm("全て削除しても大丈夫ですか？");
    //確認box
    if (sure) {
      axios
        .delete(`${apiKey}/destroy_all`)
        .then((resp) => {
          setTodos([]);
          //空の配列にする
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  console.log(apiKey);

  return (
    <div className="flex">
      <Header />

      <div className="max-w-8xl my-0  m-auto mt-10">
        <p className="text-2xl font-bold">ニュース一覧</p>
        <div className="my-4">
          <Breadcrumbs>{items}</Breadcrumbs>
        </div>

        <Button variant="outline" color="cyan">
          <Link to="/news/new">ニュースを作成する</Link>
        </Button>
        <div className="my-4">
          <Input
            type="search"
            placeholder="ニュースを探す"
            onChange={(event) => {
              setSearchName(event.target.value);
            }}
          />
        </div>
        {/* <p className="my-4">合計：{news.length}件</p> */}
        <div>
          {/* {
            // .filter((val) => {
            //   if (searchName === "") {
            //     return val;
            //     //そのまま返す
            //   } else if (
            //     val.title.toLowerCase().includes(searchName.toLowerCase())
            //     //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
            //   ) {
            //     return val;
            //   }
            // })
          */}
          {news &&
            news.map((val) => {
              return (
                <div className="my-4" key={val.id}>
                  <Timeline active={1} bulletSize={24} lineWidth={2}>
                    <Timeline.Item title="">
                      <Link to={val.id + "/edit"} component={<EditTodo />}>
                        {val.title}
                      </Link>
                      <Text color="dimmed" size="sm"></Text>
                      {val.body}
                      <Text size="xs" mt={4}>
                        {val.created_at}
                      </Text>
                    </Timeline.Item>
                  </Timeline>
                </div>
              );
            })}
        </div>
        {/* <Button variant="outline" color="cyan" onClick={removeAllTodos}>
          全削除
        </Button> */}
      </div>
    </div>
  );
};

export default RailsPage;
