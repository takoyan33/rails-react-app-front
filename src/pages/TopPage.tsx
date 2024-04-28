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
  const [deleteMember] = useDeleteMemberMutation({
    refetchQueries: ["members"],
  });
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
  // const { loading, setIsSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!currentUser) {
  //     navigate("/login");
  //   }
  // }, []);

  const handleCheckboxClick = useMemo(() => {
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
  // const { isSignedIn, currentUser } = useContext(AuthContext);
  // console.log("isSignedIn", isSignedIn);
  // console.log("currentUser", currentUser);
  // console.log("members", members);

  // const FETCH_BOOKS = gql`
  //   query {
  //     books {
  //       id
  //       title
  //     }
  //   }
  // `;

  // interface Book {
  //   id: string;
  //   title: string;
  // }
  // const { data: { books = [] } = {} } = useQuery(FETCH_BOOKS);
  // console.log("data", data);

    useEffect(() => {
      const accessToken = Cookies.get("_access_token");
      if (accessToken) {
        setHasCookies(true);
      }
    }, []);

    const [hasCookies, setHasCookies] = useState(false);
  return (
    <div className="flex">
      <Header />

      <div className="max-w-7xl m-auto mt-10">
        <h2 className="text-2xl text-center">管理画面</h2>

        <p className="m-6">
          部活やサークルの情報が見れます
        </p>
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
          <>
          </>
        )}

        {/* {members && members.length == 0 && (
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
        )} */}

        {hasCookies ? (
          <>
            <h2 className="text-2xl font-bold m-6 text-center">
              メンバー一覧 {members.length}人
            </h2>
            <Grid>
              {members &&
                members.map((member) => (
                  <Grid.Col span={5}>
                    <Card shadow="sm" p="xl" component="a" className="m-2">
                      <div>
                        <Card.Section>
                          <div className="text-center m-auto">
                            <Image src={pic} alt="プロフサンプル" width={150} />
                          </div>
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
                        {/* {isUpdate && (
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
                                    onChange={(e) =>
                                      setFullname(e.target.value)
                                    }
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
                                      onChange={(e) =>
                                        setHurigana(e.target.value)
                                      }
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
                                      onChange={(e) =>
                                        setGender(e.target.value)
                                      }
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
                                      onChange={(e) =>
                                        setBirthdaye(e.target.value)
                                      }
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
                        )} */}
                        {/* <span className="m-2">
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
                        </span> */}
                      </div>
                    </Card>
                  </Grid.Col>
                ))}
            </Grid>
          </>
        ) : (
          <p className="text-center my-6">
          </p>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
