import { PageHeader } from "antd";
import "antd/dist/antd.css";
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => (
  <>
    <Link to="/">
      <PageHeader
        className="site-page-header"
        title="API図鑑"
        subTitle="様々なAPIが見れます"
      />
    </Link>
  </>
);

export default Header;
