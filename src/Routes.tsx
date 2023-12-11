import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect, createContext } from "react";
import CommonLayout from "./components/CommonLayout";
import Home from "./pages/Home";
import { getCurrentUser } from "./lib/api/auth";
import { User } from "./interfaces/index";

import IndexPage from "./pages/IndexPage";
import QiitaPage from "./pages/QiitaPage";
import RailsPage from "./pages/news/RailsPage";
import QiitapracticePage from "./pages/QiitapracticePage";
import EditTodo from "./pages/news/EditNews";
import AddTodo from "./pages/news/AddNews";
import Error from "./components/Error";
import Dark from "./components/Darkmode";
import Resas from "./pages/ResasPage";
import AddPost from "./pages/_AddPost";
import AddMember from "./pages/club/AddMember";
import AboutPage from "./pages/AboutPage";
import AddClub from "./pages/club/AddClub";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ClubIndex from "./pages/club/ClubIndex";

// グローバルで扱う変数・関数
export const AuthContext = createContext(
  {} as {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: User | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  }
);

const Routers = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);

        console.log(res?.data.data);
      } else {
        console.log("No current user");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        // return <Redirect to="/signin" />;
      }
    } else {
      return <></>;
    }
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          loading,
          setLoading,
          isSignedIn,
          setIsSignedIn,
          currentUser,
          setCurrentUser,
        }}
      >
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/qiita" element={<QiitaPage />} />
          <Route path="/news" element={<RailsPage />} />
          <Route path="/news/:id/edit" element={<EditTodo />} />
          <Route path="/club/new" element={<AddClub />} />
          <Route path="/member/new" element={<AddMember />} />
          <Route path="/news/new" element={<AddTodo />} />
          <Route path="/qiitapractice" element={<QiitapracticePage />} />
          <Route path="*" element={<Error />} />
          <Route path="/dark" element={<Dark />} />
          <Route path="/resas" element={<Resas />} />
          <Route path="/posts/new" element={<AddPost />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/club" element={<ClubIndex />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};
export default Routers;
