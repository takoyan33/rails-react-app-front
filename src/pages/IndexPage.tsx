import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dark from "../components/Darkmode";
import apizukan from "../assets/apizukan.png";
import TextField from "@mui/material/TextField";
import { MantineProvider, Text } from "@mantine/core";

import {
  useBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useMembersQuery,
} from "../graphql/generated";

import { useState } from "react";

const IndexPage: React.FC = () => {
  const { loading, error, data: { books = [] } = {} } = useBooksQuery();
  const { data: { members = [] } = {} } = useMembersQuery();

  const [createBook] = useCreateBookMutation({ refetchQueries: ["books"] });
  const [title, setTitle] = useState("");
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation({ refetchQueries: ["books"] });

  if (loading) return <p className="text-center">...loading</p>;
  if (error) return <p className="text-center">{error.message}</p>;
  return (
    <div className="max-w-5xl m-auto">
      <Header />
      {/* <Dark /> */}
      {/* <p className="text-3xl font-bold m-auto w-30">
        <img src={apizukan} className="m-auto w-40 my-6"></img>
      </p> */}
      <p className="m-6">
        サークル管理アプリでは、部員管理やサークルの管理を楽に行えます。
      </p>
      <br></br>
      <p className="text-center">
        <Button variant="outlined" className="text-center m-auto">
          <Link to="member/new">メンバー登録をする</Link>
        </Button>
      </p>
      <h2 className="text-2xl font-bold m-6">メンバー1覧</h2>
      <p className=" font-bold m-6">{members.length}件</p>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Text>Welcome to Mantine!</Text>
      </MantineProvider>
      {members &&
        members.map((member) => (
          <div key={member.userid} className="m-6">
            <p>名前：{member.fullname}</p>
            <p>ふりがな：{member.hurigana}</p>
            <p>出身：{member.department}</p>
            <p>学年：{member.grade}</p>
            {/* <TextField
              id="standard-basic"
              label="更新"
              variant="standard"
              value={member.fullname || ""}
              onChange={(e) =>
                updateBook({
                  variables: {
                    userid: member.userid,
                    params: { fullname: e.target.value },
                  },
                })
              }
            />
            <Button
              variant="outlined"
              onClick={() => deleteBook({ variables: { userid: member.userid } })}
            >
              削除
            </Button> */}
          </div>
        ))}

      {/* <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button
        onClick={() => {
          createBook({ variables: { params: { title: title } } });
          setTitle("");
        }}
      >
        保存
      </button> */}
      <p className="text-center">
        <Button variant="outlined" className="text-center m-auto">
          <Link to="todos">ニュース一覧</Link>
        </Button>
      </p>
      {/* 
      <Stack direction="row" spacing={2}> */}
      {/* <Button variant="outlined">
          <Link to="todos">RailsAPI</Link>
        </Button>
        <br></br>
        <br></br>
        <Button variant="outlined">
          <Link to="todos/new">TODO作成RAIlsAPI</Link>
        </Button>
        <br></br>
        <br></br>
        <Button variant="outlined">
          <Link to="qiita">QiitaAPI</Link>
        </Button>
        <br></br>
        <br></br>
        <Button variant="outlined">
          <Link to="qiitapractice">Qiita練習API</Link>
        </Button>
        <br></br>
        <br></br>
        <Button variant="outlined">
          <Link to="resas">ResasAPI</Link>
        </Button> */}
      {/* </Stack> */}
    </div>
  );
};

export default IndexPage;
