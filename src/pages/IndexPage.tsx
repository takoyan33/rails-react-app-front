import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Dark from "../components/Darkmode";
import apizukan from "../assets/apizukan.png";
import TextField from "@mui/material/TextField";
import { Badge, MantineProvider } from "@mantine/core";
import { Card, Image, Text, Checkbox, Input, Button } from "@mantine/core";
import { Grid } from "@mantine/core";
import {
  useMembersQuery,
  useDeleteMemberMutation,
  useUpdateMemberMutation,
} from "../graphql/generated";
import { useState, useMemo } from "react";
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
import { AuthContext } from "../Routes";
import React, { useContext } from "react";
import { signOut } from "../lib/api/auth";

const IndexPage: React.FC = () => {
  const notify = () => toast("記事投稿ができました！");
  const { data: { members = [] } = {} } = useMembersQuery();
  console.log(members);
  const [deleteMember] = useDeleteMemberMutation({
    refetchQueries: ["members"],
  });
  console.log(qlapiKey);
  const [updateMember] = useUpdateMemberMutation();
  const [ID, setID] = useState("");
  const [fullname, setFullname] = useState("");
  const [hurigana, setHurigana] = useState("");
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [birthday, setBirthdaye] = useState("");
  const [admin, setAdmin] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const { loading, setIsSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        navigate("/");

        console.log("Succeeded in sign out");
      } else {
        console.log("Failed in sign out");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxClick = useMemo(() => {
    console.log("function generated in MyCheckbox");
    return (e) => {
      setAdmin(e.target.checked);
    };
  }, []);

  const move = () => {
    setIsUpdate(false);
  };

  const getID = (
    id,
    fullname,
    hurigana,
    department,
    gender,
    grade,
    birthday,
    admin
  ) => {
    setID(id);
    setFullname(fullname);
    setHurigana(hurigana);
    setGrade(grade);
    setGender(gender);
    setBirthdaye(birthday);
    setDepartment(department);
    setAdmin(admin);
    setIsUpdate(true);
  };
  const { isSignedIn, currentUser } = useContext(AuthContext);
  return (
    <div className="flex">
      <Header />

      {/* <Dark /> */}
      {/* <p className="text-3xl font-bold m-auto w-30">
        <img src={apizukan} className="m-auto w-40 my-6"></img>
      </p> */}

      <div className="max-w-7xl m-auto mt-10">
        <h2 className="text-2xl text-center">Clubmemo</h2>

        {isSignedIn && currentUser ? (
          <>
            <h1>Signed in successfully!</h1>
            <h2>Email: {currentUser?.email}</h2>
            <h2>Name: {currentUser?.name}</h2>
            <Button
              variant="outline"
              color="cyan"
              className="text-center m-auto"
              onClick={handleSignOut}
            >
              ログアウトする
            </Button>
          </>
        ) : (
          <h1>ログインしていません</h1>
        )}

        <p className="m-6">
          Clubmemoでは、大学の部活や中学校、高校の部員管理や情報管理を楽に行えます。
        </p>

        <p className="text-center my-2">
          <Button variant="outline" color="cyan" className="text-center m-auto">
            <Link to="register">新規登録する</Link>
          </Button>
        </p>

        <p className="text-center my-2">
          <Button variant="outline" color="cyan" className="text-center m-auto">
            <Link to="login">ログインする</Link>
          </Button>
        </p>

        <p className="text-center my-2">
          <Button variant="outline" color="cyan" className="text-center m-auto">
            <Link to="member/new">メンバー登録をする</Link>
          </Button>
        </p>

        <h2 className="text-2xl font-bold m-6 text-center">
          メンバー一覧 {members.length}人
        </h2>
        {members && members.length == 0 && (
          <Center>
            <Oval
              height={80}
              width={80}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass="margin: 0 auto;"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </Center>
        )}
        <Grid>
          {members &&
            members.map((member) => (
              <Grid.Col span={4}>
                <Card shadow="sm" p="xl" component="a" className="m-2">
                  <div>
                    <Card.Section>
                      <Image
                        src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                        height={160}
                        alt="プロフサンプル"
                      />
                    </Card.Section>
                    <Text weight={500} size="lg" mt="md">
                      <div className="whitespace-nowrap">
                        名前：{member.fullname}
                        {member.fullname == "" && <span>データ無し</span>}
                      </div>
                    </Text>
                    <Text mt="xs" color="dimmed" size="sm">
                      ふりがな：{member.hurigana}
                      {member.hurigana == "" && <span>データ無し</span>}
                    </Text>
                    <Text mt="xs" color="dimmed" size="sm">
                      学部：{member.department}
                      {member.department == "" && <span>データ無し</span>}
                    </Text>
                    <Text mt="xs" color="dimmed" size="sm">
                      性別：{member.gender}
                      {member.gender == "" && <span>データ無し</span>}
                    </Text>
                    <Text mt="xs" color="dimmed" size="sm">
                      学年：{member.grade}
                      {member.grade == "" && <span>データ無し</span>}
                    </Text>
                    <Text mt="xs" color="dimmed" size="sm">
                      誕生日：{member.birthday}
                      {member.birthday == "" && <span>データ無し</span>}
                    </Text>
                    <Text mt="xs" color="dimmed" size="sm">
                      管理者：
                      {member.admin == true && <span>管理者</span>}
                      {member.admin == false && <span>一般</span>}
                    </Text>
                    {isUpdate && (
                      <>
                        {member.id == ID && (
                          <>
                            <Input.Wrapper
                              id="input-demo"
                              withAsterisk
                              label="名前"
                              description=""
                              error=""
                            >
                              <Input
                                icon={<CiAt />}
                                placeholder="名前"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                              />
                            </Input.Wrapper>
                            <div className="my-4">
                              <Input.Wrapper
                                id="input-demo"
                                withAsterisk
                                label="ふりがな"
                                description=""
                                error=""
                              >
                                <Input
                                  icon={<CiAt />}
                                  placeholder="ふりがな"
                                  value={hurigana}
                                  onChange={(e) => setHurigana(e.target.value)}
                                />
                              </Input.Wrapper>
                            </div>
                            <div className="my-4">
                              <Input.Wrapper
                                id="input-demo"
                                withAsterisk
                                label="学年"
                                description=""
                                error=""
                              >
                                <Input
                                  icon={<CiFaceSmile />}
                                  placeholder="学年"
                                  value={grade}
                                  onChange={(e) => setGrade(e.target.value)}
                                />
                              </Input.Wrapper>
                            </div>
                            <div className="my-4">
                              <Input.Wrapper
                                id="input-demo"
                                withAsterisk
                                label="性別"
                                description=""
                                error=""
                              >
                                <Input
                                  icon={<CiUser />}
                                  placeholder="性別"
                                  value={gender}
                                  onChange={(e) => setGender(e.target.value)}
                                />
                              </Input.Wrapper>
                            </div>
                            <div className="my-4">
                              <Input.Wrapper
                                id="input-demo"
                                withAsterisk
                                label="学部"
                                description=""
                                error=""
                              >
                                <Input
                                  icon={<CiHome />}
                                  placeholder="学部"
                                  value={department}
                                  onChange={(e) =>
                                    setDepartment(e.target.value)
                                  }
                                />
                              </Input.Wrapper>
                            </div>
                            <div className="my-4">
                              <Input.Wrapper
                                id="input-demo"
                                withAsterisk
                                label="誕生日"
                                description=""
                                error=""
                              >
                                <Input
                                  icon={<CiCalendarDate />}
                                  placeholder="誕生日"
                                  type="date"
                                  value={birthday}
                                  onChange={(e) => setBirthdaye(e.target.value)}
                                />
                              </Input.Wrapper>
                            </div>
                            <div className="my-4">
                              <Input.Wrapper
                                id="input-demo"
                                withAsterisk
                                label="管理者"
                                description=""
                                error=""
                              >
                                <Checkbox
                                  label="管理者"
                                  checked={admin}
                                  onChange={handleCheckboxClick}
                                />
                              </Input.Wrapper>
                            </div>
                            <span className="m-2">
                              <span className="my-2">
                                <Button
                                  variant="outline"
                                  color="cyan"
                                  onClick={() =>
                                    updateMember({
                                      variables: {
                                        id: member.id,
                                        params: {
                                          profilepic: "aaaa",
                                          fullname: fullname,
                                          hurigana: hurigana,
                                          department: department,
                                          grade: grade,
                                          gender: gender,
                                          birthday: birthday,
                                          admin: admin,
                                        },
                                      },
                                    })
                                  }
                                >
                                  プロフィールを更新する
                                </Button>
                              </span>
                              <span className="m-2">
                                <Button
                                  variant="outline"
                                  color="cyan"
                                  onClick={move}
                                >
                                  編集を終了する
                                </Button>
                              </span>
                            </span>
                          </>
                        )}
                      </>
                    )}

                    <span className="m-2">
                      <Button
                        variant="outline"
                        color="cyan"
                        onClick={() =>
                          getID(
                            member.id,
                            member.fullname,
                            member.hurigana,
                            member.department,
                            member.grade,
                            member.gender,
                            member.birthday,
                            member.admin
                          )
                        }
                      >
                        編集
                      </Button>
                    </span>
                    <span className="m-2">
                      <Button
                        variant="outline"
                        color="cyan"
                        onClick={() =>
                          deleteMember({ variables: { id: member.id } })
                        }
                      >
                        削除
                      </Button>
                    </span>
                  </div>
                </Card>
              </Grid.Col>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default IndexPage;
