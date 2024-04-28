import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Card, Image, Text, Checkbox, Input, Button } from "@mantine/core";
import { Grid } from "@mantine/core";
import {
  useMembersQuery,
  useDeleteMemberMutation,
  useUpdateMemberMutation,
} from "../graphql/generated";
import { useState, useMemo, useEffect } from "react";
import { Header } from "../components/Header";
import { qlapiKey } from "../components/env";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CiFaceSmile,
  CiUser,
  CiHome,
  CiAt,
  CiCalendarDate,
} from "react-icons/ci";
import { Oval } from "react-loader-spinner";
import { Center } from "@mantine/core";
// import { AuthContext } from "../Routes";
import React, { useContext } from "react";
import pic from "../../public/kkrn_icon_user.png";
// import { useQuery, gql } from "@apollo/client";

const IndexPage: React.FC = () => {
  const notify = () => toast("記事投稿ができました！");
  const { data: { members = [] } = {} } = useMembersQuery();
  const { data } = useMembersQuery();
  console.log(data);

  useEffect(() => {
    const accessToken = Cookies.get("_access_token");
    if (accessToken) {
      setHasCookies(true);
    }
  }, []);

  const [hasCookies, setHasCookies] = useState(false);
  return (
    <div className="flex">
      <div className="max-w-7xl m-auto mt-10">
        <h2 className="text-4xl text-center font-bold">ClubMemo</h2>

        <p className="m-6 text-lg">
          ClubMemoでは、大学の部活や中学校、高校の部員管理や情報管理を楽に行えます。
        </p>

        <h2>使える機能</h2>

        <li>所属メンバーの管理</li>
        <li>サークルの管理</li>
        {hasCookies ? (
          <p className="text-center my-2">
            <Button
              variant="outline"
              color="cyan"
              className="text-center m-auto"
            >
              <Link to="member/new">メンバー登録をする</Link>
            </Button>
          </p>
        ) : (
          <div className="flex m-auto">
            <div className="my-2 mx-2 text-center">
              <Link to="/register">
                <Button variant="outline" color="cyan">
                  新規登録
                </Button>
              </Link>
            </div>
            <div className="my-2 mx-2 text-center">
              <Link to="/login">
                <Button variant="outline" color="cyan">
                  ログイン
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
