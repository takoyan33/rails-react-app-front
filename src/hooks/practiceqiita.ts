/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { apiClient } from "../lib/api/qiita";
import { QiitaItem, QiitaItemResponse } from "../types/QiitaItem";

export const practiceqiita = () => {
  const [articles, setArticles] = useState<Array<QiitaItem>>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchArticles = async () => {
    setIsLoading(true); // ローディング開始
    setErrorMessage(""); // エラーメッセージを初期化
    // await を付与することでこの処理が終わらない限り次の処理に進まないようになる（これがないとローディング処理などが先に呼ばれてしまう）
    await apiClient
      .get<Array<QiitaItemResponse>>("/items", {
        params: {
          query: "react", // フォーム入力を検索ワードとして設定
          per_page: 50, // 50件 の記事を取得するように設定
        },
      })
      .then((response) => {
        // レスポンスから利用したい要素を QiitaItem 型 の配列でセット
        setArticles(
          response.data.map<QiitaItem>((d) => {
            return {
              id: d.id,
              title: d.title,
              likes_count: d.likes_count,
              user: d.user,
            };
          })
        );
      })
      .catch((error) => {
        // エラーメッセージをセット
        setErrorMessage(error.message);
      });

    setIsLoading(false); // ローディング終了
  };

  return {
    articles,
    errorMessage,
    isLoading,
    fetchArticles,
  };
};
