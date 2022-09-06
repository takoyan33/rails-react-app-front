import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Dark from "../components/Darkmode";

const IndexPage: React.FC = () => {
  return (
    <>
      <Header />
      <Dark />
      <h2 className="text-3xl font-bold">API図鑑</h2>
      <p className="">API図鑑では、APIを用いたアプケーションを紹介します。</p>
      <br></br>
      <button>
        <Link to="todos">RailsAPI</Link>
      </button>
      <br></br>
      <br></br>
      <button>
        <Link to="todos/new">TODO作成RAIlsAPI</Link>
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
