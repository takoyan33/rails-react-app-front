import React, { useState, useEffect } from "react";
import axios from "axios";

const Resas = () => {
  const [resass, setResas] = useState([]);
  const [loading, setLoading] = useState(true);
  const resassurl = "https://opendata.resas-portal.go.jp/api/v1";

  useEffect(() => {

    // 都道府県一覧を取得する
    axios
      .get(`${resassurl}/prefectures`, {
        headers: { "X-API-KEY": "GekHJw2h9l1K2N03H0yDPRBzYhmUDlcooBGam8QQ" },
      })
      .then((results) => {
        setResas(results.data.result);
        setLoading(false);
      })
      .catch((error) => {});
  }, []);

  console.log(resass);

  

  return (
    <>
      <h2>Resas</h2>
      <p>県の名前</p>
      {loading == true && <p>loding中です。</p>}

      {resass.map((el) => (
        <li key={el.prefCode}> {el.prefName} </li>
      ))}
    </>
  );
};
export default Resas;
