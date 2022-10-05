import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dark from "../components/Darkmode";
import apizukan from "../assets/apizukan.png";
import { useQuery, gql } from "@apollo/client";

const FETCH_BOOKS = gql`
  query {
    books {
      id
      title
    }
  }
`;

interface Book {
  id: string;
  title: string;
}

const IndexPage: React.FC = () => {
  const { data: { books } = {} } = useQuery(FETCH_BOOKS);
  return (
    <div className="max-w-5xl m-auto">
      <Header />
      {/* <Dark /> */}
      <p className="text-3xl font-bold m-auto w-30">
        <img src={apizukan} className="m-auto w-40 my-6"></img>
      </p>
      <p className="">
        APIずかんでは、APIを用いた記事紹介やAPIに関する記事を投稿できます。
      </p>
      <br></br>

      <Button variant="outlined">
        <Link to="posts/new">記事を投稿する</Link>
      </Button>
      <h2 className="text-2xl font-bold">記事一覧</h2>

      {books &&
        books.map((book: Book) => (
          <div key={book.id} className="m-6">
            <p>{book.title}</p>
          </div>
        ))}

      <h2 className="text-2xl font-bold">ニュース一覧</h2>

      <Button variant="outlined">
        <Link to="todos">ニュースはこちら</Link>
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
