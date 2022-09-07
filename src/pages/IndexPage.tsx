import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// import Dark from "../components/Darkmode";

const IndexPage: React.FC = () => {
  return (
    <div className="max-w-5xl m-auto">
      <Header />
      {/* <Dark /> */}
      <p className="text-3xl font-bold">API図鑑</p>
      <p className="">API図鑑では、APIを用いたアプケーションを紹介します。</p>
      <br></br>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined">
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
        </Button>
      </Stack>
    </div>
  );
};

export default IndexPage;
