import React, { useState, useEffect } from "react";
import axios from "axios";

type Data = {
  prefCode: string;
  prefName: string;
};

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
    <div className="max-w-5xl m-auto">
      <h2>Resas API</h2>
      <p>県の名前</p>
      {loading == true && <p>loading中です。</p>}

      {resass.map((data: Data) => (
        <li key={data.prefCode}> {data.prefName} </li>
      ))}
    </div>
  );
};
export default Resas;
