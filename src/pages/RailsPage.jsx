import React, { useState, useEffect } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { AiFillEdit } from "react-icons/ai";
import styled from "styled-components";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import EditTodo from "./EditTodo";
import Button from "@mui/material/Button";
import { usePost } from "./fetch/usePost";
import { apiKey } from "../components/env";

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

const RailsPage = () => {
  const [todos, setTodos] = useState([]);
  const [searchName, setSearchName] = useState("");
  const { data, isLoading, isError } = usePost();
  if (isLoading) return <div>読み込み中</div>;
  if (isError) return <div>エラーが出ました</div>;

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
    axios
      .patch(`${apiKey}/${val.id}`, data)
      .then((resp) => {
        const newTodos = [...todos];
        //スプレッド構文で開ける
        newTodos[index].is_completed = resp.data.is_completed;
        //番号を指定する
        setTodos(newTodos);
      });
  };
  return (
    <>
      <Header />
      <div className="max-w-5xl m-auto">
        <p className="text-3xl font-bold">新着ニュース</p>

        <br></br>
        <p>
          <Link to="/">トップページ</Link>　＞　
          <Link to="/todos">ニュース一覧</Link>
        </p>
        <br></br>

        <Button variant="outlined">
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
          <RemoveAllButton onClick={removeAllTodos}>全削除</RemoveAllButton>
        </SearchAndButtton>
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
                  {val.is_completed ? (
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
                  )}
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
      </div>
    </>
  );
};

export default RailsPage;
