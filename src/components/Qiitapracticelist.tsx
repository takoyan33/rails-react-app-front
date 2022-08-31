import React from "react";
import { QiitaItem } from "../types/QiitaItem";
import { ArticleItem } from "./ArticleList/ArticleItem";

interface Props {
  articles: Array<QiitaItem>;
  errorMessage: string;
  isLoading: boolean;
}

export const Qiitapracticelist: React.VFC<Props> = (props) => {
  // ローディング中
  if (props.isLoading) {
    return (
      <p className="mb-2 p-8 bg-yellow-100 rounded-lg">ローディング.......</p>
    );
  }
  // エラー（API失敗）
  if (props.errorMessage) {
    return (
      <p className="mb-2 p-8 bg-red-100 rounded-lg">{props.errorMessage}</p>
    );
  }
  // 成功したものの、検索結果0件
  if (props.articles?.length === 0) {
    return (
      <p className="mb-2 p-8 bg-green-100 rounded-lg">
        検索ワード
        <span className="font-bold border-b-2 border-black"></span>
        に該当なし！！
      </p>
    );
  }

  return (
    <>
      {props.articles?.map((article) => {
        return <ArticleItem key={article.id} article={article} />;
      })}
    </>
  );
};
