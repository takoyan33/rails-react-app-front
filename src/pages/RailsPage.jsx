import React, { useState, useEffect } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { AiFillEdit } from "react-icons/ai";
import styled from "styled-components";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import EditTodo from "./EditTodo";
import { usePost } from "./fetch/usePost";
import { apiKey } from "../components/env";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { Input, Button } from "@mantine/core";

const SearchAndButtton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchForm = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
`;

const RemoveAllButton = styled.button`
  width: 16%;
  height: 40px;
  background: #f54242;
  border: none;
  font-weight: 500;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
`;

const TodoName = styled.span`
  font-size: 27px;
  ${({ is_completed }) =>
    is_completed &&
    `
    opacity: 0.4;
  `}
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px auto;
  padding: 10px;
  font-size: 25px;
`;

const CheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  color: green;
  cursor: pointer;
`;

const UncheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  cursor: pointer;
`;

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`;

const items = [
  { title: "トップページ", href: "/" },
  { title: "ニュース一覧", href: "/todos/" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    <Link to={item.href}>{item.title}</Link>
  </Anchor>
));

const RailsPage = () => {
  const [todos, setTodos] = useState([]);
  const [searchName, setSearchName] = useState("");
  const { data, isLoading, isError } = usePost();
  if (isLoading) return <p className="text-center mt-10">読み込み中</p>;
  if (isError)
    return (
      <p className="text-center mt-10">{isError.message}エラーが出ました</p>
    );

  const removeAllTodos = () => {
    const sure = window.confirm("全て削除しても大丈夫ですか？");
    //確認box
    if (sure) {
      axios
        .delete(`${apiKey}/destroy_all`)
        .then((resp) => {
          setTodos([]);
          //空の配列にする
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const updateIsCompleted = (index, val) => {
    //引数を２つ取る
    var data = {
      id: val.id,
      name: val.name,
      is_completed: !val.is_completed,
      //値が反転する true→false
    };
    axios.patch(`${apiKey}/${val.id}`, data).then((resp) => {
      const newTodos = [...todos];
      //スプレッド構文で開ける
      newTodos[index].is_completed = resp.data.is_completed;
      //番号を指定する
      setTodos(newTodos);
    });
  };

  console.log(apiKey);

  return (
    <div className="flex">
      <Header />

      <div className="max-w-8xl my-0  m-auto mt-10">
        <p className="text-2xl font-bold">ニュース一覧</p>
        <div className="my-4">
          <Breadcrumbs>{items}</Breadcrumbs>
        </div>

        <Button variant="outline" color="cyan">
          <Link to="/todos/new">ニュースを作成する</Link>
        </Button>

        <SearchAndButtton>
          <SearchForm
            type="text"
            placeholder="ニュースを探す"
            onChange={(event) => {
              setSearchName(event.target.value);
            }}
          />
        </SearchAndButtton>
        <p className="my-4">合計：{data.length}件</p>
        <div>
          {data
            .filter((val) => {
              if (searchName === "") {
                return val;
                //そのまま返す
              } else if (
                val.name.toLowerCase().includes(searchName.toLowerCase())
                //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
              ) {
                return val;
              }
            })
            .map((val, key) => {
              return (
                <Row key={key}>
                  {/* {val.is_completed ? (
                    <CheckedBox>
                      <ImCheckboxChecked
                        onClick={() => updateIsCompleted(key, val)}
                      />
                    </CheckedBox>
                  ) : (
                    <UncheckedBox>
                      <ImCheckboxUnchecked
                        onClick={() => updateIsCompleted(key, val)}
                      />
                    </UncheckedBox>
                  )} */}
                  <TodoName is_completed={val.is_completed}>
                    {val.name}
                  </TodoName>
                  <Link to={val.id + "/edit"} component={<EditTodo />}>
                    <EditButton>
                      <AiFillEdit />
                    </EditButton>
                  </Link>
                </Row>
              );
            })}
        </div>
        <Button variant="outline" color="cyan" onClick={removeAllTodos}>
          全削除
        </Button>
      </div>
    </div>
  );
};

export default RailsPage;
