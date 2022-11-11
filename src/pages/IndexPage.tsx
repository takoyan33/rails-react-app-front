import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dark from "../components/Darkmode";
import apizukan from "../assets/apizukan.png";
import TextField from "@mui/material/TextField";
import { Badge, MantineProvider } from "@mantine/core";
import {
  useMembersQuery,
  useDeleteMemberMutation,
  useUpdateMemberMutation,
} from "../graphql/generated";
import { useState } from "react";
import { Header } from "../components/Header";

const IndexPage: React.FC = () => {
  const { data: { members = [] } = {} } = useMembersQuery();
  console.log(members);
  const [deleteMember] = useDeleteMemberMutation({
    refetchQueries: ["members"],
  });

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
      <div className="max-w-7xl m-auto">
        <h2>サークル管理アプリ</h2>
        <p className="m-6">
          サークル管理アプリでは、部員管理やサークルの管理を楽に行えます。
        </p>
        <br></br>
        <p className="text-center">
          <Button variant="outlined" className="text-center m-auto">
            <Link to="member/new">メンバー登録をする</Link>
          </Button>
        </p>
        <h2 className="text-2xl font-bold m-6">メンバー一覧</h2>
        <p className=" font-bold m-6">{members.length}件</p>
        {members &&
          members.map((member) => (
            <div key={member.id} className="m-6 border">
              <p>名前：{member.fullname}</p>
              <p>ふりがな：{member.hurigana}</p>
              <p>学部：{member.department}</p>
              <p>学年：{member.grade}</p>
              <p>誕生日：{member.birthday}</p>
              <p>管理者：{member.admin}</p>
              <TextField
                id="standard-basic"
                label="名前"
                variant="standard"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <div className="my-4">
                <TextField
                  id="standard-basic"
                  label="ふりがな"
                  variant="standard"
                  value={hurigana}
                  onChange={(e) => setHurigana(e.target.value)}
                />
              </div>
              <div className="my-4">
                <TextField
                  id="standard-basic"
                  label="学年"
                  variant="standard"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </div>
              <div className="my-4">
                <TextField
                  id="standard-basic"
                  label="性別"
                  variant="standard"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <div className="my-4">
                <TextField
                  id="standard-basic"
                  label="学部"
                  variant="standard"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
              <div className="my-4">
                <TextField
                  id="standard-basic"
                  label="誕生日"
                  variant="standard"
                  value={birthday}
                  onChange={(e) => setBirthdaye(e.target.value)}
                />
              </div>
              <Button
                variant="outlined"
                onClick={() =>
                  updateMember({
                    variables: {
                      id: member.id,
                      params: {
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
                更新
              </Button>

              <Button
                variant="outlined"
                onClick={() => deleteMember({ variables: { id: member.id } })}
              >
                削除
              </Button>
            </div>
          ))}
        <p className="text-center">
          <Button variant="outlined" className="text-center m-auto">
            <Link to="todos">ニュース一覧</Link>
          </Button>
        </p>
      </div>
    </div>
  );
};

export default IndexPage;
