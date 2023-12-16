import React, { useState, useEffect } from "react";
import { useListQiitaArticles } from "../../hooks/useListQiitaArticles";
import { ArticleList } from "../../components/ArticleList";
import { SearchForm } from "../../components/SearchForm";
import { Header } from "../../components/Header";

const QiitaPage: React.FC = () => {
  const { articles, searchWord, errorMessage, isLoading, fetchArticles } =
    useListQiitaArticles();
  return (
    <div className="max-w-5xl m-auto">
      <Header />
      <p className="text-3xl font-bold">Qiita</p>
      <p>QiitaAPIを用いたTODOアプリです。</p>

      <SearchForm fetchArticles={fetchArticles} />
      <ArticleList
        articles={articles}
        searchWord={searchWord}
        errorMessage={errorMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default QiitaPage;
