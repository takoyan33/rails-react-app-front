import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dark from "../components/Darkmode";
import apizukan from "../assets/apizukan.png";
import {
  useBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} from "../graphql/generated";
import { useState } from "react";

const IndexPage: React.FC = () => {
  const { data: { books = [] } = {} } = useBooksQuery();
  const [createBook] = useCreateBookMutation({ refetchQueries: ["books"] });
  const [title, setTitle] = useState("");
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation({ refetchQueries: ["books"] });
  return (
    <div className="max-w-5xl m-auto">
      <Header />
      {/* <Dark /> */}
      <p className="text-3xl font-bold m-auto w-30">
        <img src={apizukan} className="m-auto w-40 my-6"></img>
      </p>
      <p className="m-6">
        APIずかんでは、APIを用いた記事紹介やAPIに関する記事を投稿できます。
      </p>
      <br></br>
      <p className="text-center">
        <Button variant="outlined" className="text-center m-auto">
          <Link to="posts/new">記事を投稿する</Link>
        </Button>
      </p>
      <h2 className="text-2xl font-bold m-6">記事一覧</h2>

      {books &&
        books.map((book) => (
          <div key={book.id} className="m-6">
            <div>{book.title}</div>
            <input
              value={book.title || ""}
              onChange={(e) =>
                updateBook({
                  variables: {
                    id: book.id,
                    params: { title: e.target.value },
                  },
                })
              }
            />
            <button onClick={() => deleteBook({ variables: { id: book.id } })}>
              削除
            </button>
          </div>
        ))}

      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button
        onClick={() => {
          createBook({ variables: { params: { title: title } } });
          setTitle("");
        }}
      >
        保存
      </button>

      <Button variant="outlined">
        <Link to="todos">ニュース</Link>
      </Button>
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
