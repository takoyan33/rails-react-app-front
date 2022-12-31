import React, { useState, useContext } from "react";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input, Button } from "@mantine/core";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { CiCalendarDate } from "react-icons/ci";
import { AuthContext } from "../Routes";
import { signUp } from "../lib/api/auth";
import Cookies from "js-cookie";

const items = [
  { title: "トップページ", href: "/" },
  { title: "クラブの新規登録", href: "/register" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    <Link to={item.href}>{item.title}</Link>
  </Anchor>
));

function AddClub() {
  const notify = () => toast("メンバー登録できました！");
  const navigate = useNavigate();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    try {
      const res = await signUp(params);
      console.log(res);

      if (res.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        navigate("/");

        console.log("Signed in successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
    }
  };

  return (
    <div className="flex">
      <Header />
      <ToastContainer />
      <div className="max-w-6xl m-auto mt-12">
        <p className="text-3xl font-bold">クラブの新規登録</p>
        <div className="my-4">
          <Breadcrumbs>{items}</Breadcrumbs>
        </div>

        <div className="my-4">
          <Input.Wrapper
            id="input-demo"
            withAsterisk
            label="メールアドレス"
            description=""
            error=""
          >
            <Input
              icon={<CiCalendarDate />}
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
              icon={<CiCalendarDate />}
              placeholder="パスワード"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Input.Wrapper>
        </div>

        <div className="my-4">
          <Input.Wrapper
            id="input-demo"
            withAsterisk
            label="パスワード確認用"
            description=""
            error=""
          >
            <Input
              icon={<CiCalendarDate />}
              placeholder="パスワード確認用"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </Input.Wrapper>
        </div>

        <div className="my-4 text-center m-auto">
          <Button variant="outline" color="cyan" onClick={handleSubmit}>
            登録する
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddClub;
