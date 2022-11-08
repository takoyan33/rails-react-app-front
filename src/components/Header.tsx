import { PageHeader } from "antd";
import "antd/dist/antd.css";
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => (
  <>
    <Link to="/">
      <PageHeader
        className="site-page-header"
        title="サークル管理APP"
        subTitle="サークル管理ができるサイト"
      />
    </Link>
  </>
);

export default Header;
