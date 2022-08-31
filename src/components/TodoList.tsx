import React, { useState, useEffect } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";


export const TodoList = () => {


  return (
    <table>
      <thead>
        <tr>
          <th className="text-3xl font-bold underline">Todos</th>
          <th></th>
        </tr>
      </thead>
      

      <tbody>
        {/* {todos.map((todo: Todo, index: number) => {
          return <TodoItem key={index} todo={todo} setTodos={setTodos} />;
        })} */}
      </tbody>
    </table>
  );
};
