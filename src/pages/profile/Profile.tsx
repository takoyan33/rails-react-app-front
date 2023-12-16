import React, { useState, useContext } from "react";
import { Header } from "../../components/Header";
import { AuthContext } from "../../Routes";



function Profile(props: any) {
const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <div className="flex">
      <Header />
      <div className="max-w-6xl m-auto m- mt-12">
        <h2 className="text-3xl font-bold">プロフィール</h2>

        {isSignedIn && currentUser ? (
          <>
            <h1>ログイン中</h1>
            <h2>Email: {currentUser?.email}</h2>
            <h2>Name: {currentUser?.name}</h2>
          </>
        ) : (
          <h1>Not signed in</h1>
        )}
      </div>
    </div>
  );
}

export default Profile;
