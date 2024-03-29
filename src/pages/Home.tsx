import React, { useContext } from "react";
import { AuthContext } from "../Routes";

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Home: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <>
      {isSignedIn && currentUser ? (
        <>
          <h1>ログイン中</h1>
          <h2>Email: {currentUser?.email}</h2>
          <h2>Name: {currentUser?.name}</h2>
        </>
      ) : (
        <h1>Not signed in</h1>
      )}
    </>
  );
};

export default Home;
