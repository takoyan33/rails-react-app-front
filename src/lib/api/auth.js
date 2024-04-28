import client from "./client";
import Cookies from "js-cookie";
// import { SignUpParams, SignInParams } from "../../components/index";
import { rootKey } from "../../components/env";

// サインアップ（新規アカウント作成）
export const signUp = (params) => {
  return client.post(rootKey, params);
};

// サインイン（ログイン）
export const signIn = (params) => {
  return client.post(rootKey + "/sign_in", params);
};

// サインアウト（ログアウト）
export const signOut = () => {
  Cookies.remove("_access_token");
  Cookies.remove("_client");
  Cookies.remove("_uid");
};
// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  if (
    !Cookies.get("_access_token") ||
    !Cookies.get("_client") ||
    !Cookies.get("_uid")
  ) {
    console.error("Required cookies are missing.");
    return; // ここで処理を中断するか、適切なエラー処理を行う
  }

  if (!client) {
    console.error("Client is not defined."); // clientが未定義の場合のエラー処理
    return;
  }

  return client.get(rootKey + "/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
