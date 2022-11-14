import React from "react";
import { Link } from "react-router-dom";
import Dark from "../components/Darkmode";
import apizukan from "../assets/apizukan.png";
import TextField from "@mui/material/TextField";
import { Badge, MantineProvider } from "@mantine/core";
import { Card, Image, Text, Flex } from "@mantine/core";
import { Grid } from "@mantine/core";
import {
  useMembersQuery,
  useDeleteMemberMutation,
  useUpdateMemberMutation,
} from "../graphql/generated";
import { useState } from "react";
import { Header } from "../components/Header";
import { Input, Button } from "@mantine/core";
import { qlapiKey } from "../components/env";

const IndexPage: React.FC = () => {
  const { data: { members = [] } = {} } = useMembersQuery();
  console.log(members);
  const [deleteMember] = useDeleteMemberMutation({
    refetchQueries: ["members"],
  });
  console.log(qlapiKey);
  const [updateMember] = useUpdateMemberMutation();
  const [fullname, setFullname] = useState("");
  const [hurigana, setHurigana] = useState("");
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [birthday, setBirthdaye] = useState("");
  const [admin, setAdmin] = useState("0");

  return (
    <div className="flex">
      <Header />

      {/* <Dark /> */}
      {/* <p className="text-3xl font-bold m-auto w-30">
        <img src={apizukan} className="m-auto w-40 my-6"></img>
      </p> */}
      <div className="max-w-7xl m-auto mt-10">
        <h2 className="text-2xl text-center">サークル管理アプリ</h2>
        <p className="m-6">
          サークル管理アプリでは、部員管理やサークルの管理を楽に行えます。
        </p>
        <br></br>
        <p className="text-center">
          <Button variant="outline" color="cyan" className="text-center m-auto">
            <Link to="member/new">メンバー登録をする</Link>
          </Button>
        </p>
        <h2 className="text-2xl font-bold m-6">メンバー一覧</h2>
        <p className=" font-bold m-6">{members.length}人</p>
        {members && members.length == 0 && (
          <p className="text-center my-6">まだ登録されていません</p>
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
                      名前：{member.fullname}
                    </Text>
                    <Text mt="xs" color="dimmed" size="sm">
                      ふりがな：{member.hurigana}
                    </Text>
                    <Text mt="xs" color="dimmed" size="sm">
                      学部：{member.department}
                    </Text>
                    <Text mt="xs" color="dimmed" size="sm">
                      性別：{member.gender}
                    </Text>
                    <Text mt="xs" color="dimmed" size="sm">
                      学年：{member.grade}
                    </Text>
                    <Text mt="xs" color="dimmed" size="sm">
                      誕生日：{member.birthday}
                    </Text>
                    <Text mt="xs" color="dimmed" size="sm">
                      管理者：{member.admin}
                    </Text>
                    <Input.Wrapper
                      id="input-demo"
                      withAsterisk
                      label="名前"
                      description=""
                      error=""
                    >
                      <Input
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
                          placeholder="学部"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
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
                          placeholder="誕生日"
                          type="date"
                          value={birthday}
                          onChange={(e) => setBirthdaye(e.target.value)}
                        />
                      </Input.Wrapper>
                    </div>
                    <span className="m-2">
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
                                admin: false,
                              },
                            },
                          })
                        }
                      >
                        更新
                      </Button>
                    </span>
                    <div className="m-2">
                      <Button
                        variant="outline"
                        color="cyan"
                        onClick={() =>
                          deleteMember({ variables: { id: member.id } })
                        }
                      >
                        削除
                      </Button>
                    </div>
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
