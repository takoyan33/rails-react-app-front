import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect, createContext } from "react";
import CommonLayout from "./components/CommonLayout";
import Home from "./pages/Home";
import { getCurrentUser } from "./lib/api/auth";
import { User } from "./interfaces/index";
import TopPage from "./pages/TopPage";
import IndexPage from "./pages/IndexPage";
import QiitaPage from "./pages/api/QiitaPage";
import IndexNews from "./pages/news/IndexNews";
import QiitapracticePage from "./pages/api/QiitapracticePage";
import EditTodo from "./pages/news/EditNews";
import AddTodo from "./pages/news/AddNews";
import Error from "./components/Error";
import Dark from "./components/Darkmode";
import Resas from "./pages/api/ResasPage";
import AddPost from "./pages/_AddPost";
import AddMember from "./pages/member/AddMember";
import AboutPage from "./pages/AboutPage";
import AddClub from "./pages/club/AddClub";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ClubIndex from "./pages/club/ClubIndex";
import Profile from "./pages/profile/Profile";

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
      console.log("res", res);
      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res?.data.data);
      } else {
        console.log("ログインユーザーはいません");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

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
          <Route path="/top" element={<TopPage />} />
          <Route path="/qiita" element={<QiitaPage />} />
          <Route path="/news" element={<IndexNews />} />
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
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};
export default Routers;
