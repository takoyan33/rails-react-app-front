import { PageHeader } from "antd";
import "antd/dist/antd.css";
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => (
  <>
    <Link to="/">
      <PageHeader
        className="site-page-header"
        title="APIずかん"
        subTitle="APIに関する情報が見れるサイト"
      />
    </Link>
  </>
);

export default Header;
