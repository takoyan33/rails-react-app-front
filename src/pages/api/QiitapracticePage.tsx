import React from "react";
import { practiceqiita } from "../../hooks/practiceqiita";
import { Qiitapracticelist } from "../../components/Qiitapracticelist";
import { Header } from "../../components/Header";

const QiitapracticePage: React.FC = () => {
  const { articles, errorMessage, isLoading, fetchArticles } = practiceqiita();

  return (
    <div className="max-w-5xl m-auto">
      <Header />
      <p className="text-3xl font-bold">Qiita</p>
      <p>Qiita記事を50件　Reactで表示する</p>

      <button onClick={fetchArticles}>表示する</button>

      <Qiitapracticelist
        articles={articles}
        errorMessage={errorMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default QiitapracticePage;
