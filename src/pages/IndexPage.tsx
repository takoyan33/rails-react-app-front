import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const IndexPage: React.FC = () => {
  return (
    <>
      <Header />
      <h1 className="">API図鑑</h1>
      <p className="">API図鑑では、APIを用いたアプケーションを紹介します。</p>
      <button>
        <Link to="todos">RailsAPI</Link>
      </button>
      <br></br>
      <br></br>
      <button>
        <Link to="qiita">QiitaAPI</Link>
      </button>
      <br></br>
      <br></br>
      <button>
        <Link to="qiitapractice">Qiita練習API</Link>
      </button>
      <br></br>
      <br></br>
      <button>
        <Link to="resas">ResasAPI</Link>
      </button>
    </>
  );
};

export default IndexPage;
