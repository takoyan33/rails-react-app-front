import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { Header } from "../../components/Header";
import { Link, Router } from "react-router-dom";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import {
  useMembersQuery,
  useCreateMemberMutation,
} from "../../graphql/generated";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input, Button } from "@mantine/core";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { CiAt } from "react-icons/ci";
import { AuthContext } from "../../Routes";
import { signIn } from "../../lib/api/auth";

const items = [
  { title: "トップページ", href: "/" },
  { title: "クラブのログイン", href: "/login" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    <Link to={item.href}>{item.title}</Link>
  </Anchor>
));

function AddClub() {
  const notify = () => toast("メンバー登録できました！");
  const [createMember] = useCreateMemberMutation({
    refetchQueries: ["members"],
  });
  const { data: { members = [] } = {} } = useMembersQuery();
  console.log(members);
  const [admin, setAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const params = {
      email: email,
      password: password,
    };

    try {
      const res = await signIn(params);
      console.log(res);

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);
        setIsLoading(false);
        setCurrentUser(res.data.data);
        alert("ログインに成功しました");
        setIsSignedIn(true);
        navigate("/");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      alert("ログインに失敗しました");
      setAlertMessageOpen(true);
    }
  };

  return (
    <div className="flex">
      <Header />
      <ToastContainer />
      <div className="max-w-6xl m-auto mt-12">
        <p className="text-3xl font-bold">クラブのログイン</p>
        <div className="my-4">
          <Breadcrumbs>{items}</Breadcrumbs>
        </div>

        {isLoading && (
          <div className="my-4 text-center m-auto">
            <p>処理中はしばらくお待ちください...</p>
          </div>
        )}

        <div className="my-4">
          <Input.Wrapper
            id="input-demo"
            withAsterisk
            label="メールアドレス"
            description=""
            error=""
          >
            <Input
              icon={<CiAt />}
              placeholder="メールアドレス"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Input.Wrapper>
        </div>

        <div className="my-4">
          <Input.Wrapper
            id="input-demo"
            withAsterisk
            label="パスワード"
            description=""
            error=""
          >
            <Input
              icon={<CiAt />}
              placeholder="パスワード"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Input.Wrapper>
        </div>

        <div className="my-4 text-center m-auto">
          <Button variant="outline" color="cyan" onClick={handleSubmit}>
            ログインする
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddClub;
