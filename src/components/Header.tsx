import { Card, Image, Text, Checkbox, Input, Button } from "@mantine/core";
import "antd/dist/antd.css";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect, createContext } from "react";
import { AuthContext } from "../Routes";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
} from "@mantine/core";
import {
  AiFillHome,
  AiFillFile,
  AiFillEdit,
  AiFillQuestionCircle,
  AiFillInfoCircle,
  AiFillStop,
  AiFillSmile,
} from "react-icons/ai";
import { signOut } from "../lib/api/auth";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

const mockdata = [
  { icon: <AiFillHome />, label: "TOP", href: "/top" },
  { icon: <AiFillFile />, label: "ニュース", href: "/news" },
  { icon: <AiFillQuestionCircle />, label: "About", href: "/about" },
  // { icon: <AiFillInfoCircle />, label: "サークルについて", href: "/club" },
  // { icon: <AiFillFile />, label: "新規登録", href: "/register" },
  // { icon: <AiFillHome />, label: "ログイン", href: "/login" },
];

interface NavbarLinkProps {
  href: string;
  icon: any;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon, label, active, onClick, href }: NavbarLinkProps) {
  const { classes, cx } = useStyles();

  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <Link to={href}>
        <UnstyledButton
          onClick={onClick}
          className={cx(classes.link, { [classes.active]: active })}
        >
          {icon}
        </UnstyledButton>
      </Link>
    </Tooltip>
  );
}

export const Header = () => {
  const { classes, cx } = useStyles();
  // const { isSignedIn, currentUser } = useContext(AuthContext);
  const [active, setActive] = useState(2);
  const navigate = useNavigate();
  const { loading, setIsSignedIn } = useContext(AuthContext);
  const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      Cookies.remove("_access_token");
      Cookies.remove("_client");
      Cookies.remove("_uid");
      alert("ログアウトに成功しました");
      navigate("/");
      setIsSignedIn(false);
    } catch (err) {
      console.log(err);
    }
  };

  const links = mockdata.map((link, index, icon) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  const [hasCookies, setHasCookies] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("_access_token");
    if (accessToken) {
      setHasCookies(true);
    }
  }, []);

  return (
    <>
      <Navbar height={1200} width={{ base: 80 }} p="md">
        <Navbar.Section grow mt={50}>
          <Stack justify="center" spacing={0}>
            {links}
          </Stack>
          {hasCookies && (
            <>
              <Tooltip
                label="メンバー登録"
                position="right"
                transitionDuration={0}
              >
                <Link to={"/member/new"}>
                  <UnstyledButton className={cx(classes.link)}>
                    <AiFillEdit />
                  </UnstyledButton>
                </Link>
              </Tooltip>
              <Tooltip
                label="プロフィール"
                position="right"
                transitionDuration={0}
              >
                <Link to={"/profile"}>
                  <UnstyledButton className={cx(classes.link)}>
                    <AiFillSmile />
                  </UnstyledButton>
                </Link>
              </Tooltip>
              <Tooltip
                label="サークルについて"
                position="right"
                transitionDuration={0}
              >
                <Link to={"/club"}>
                  <UnstyledButton className={cx(classes.link)}>
                    <AiFillSmile />
                  </UnstyledButton>
                </Link>
              </Tooltip>
              <Tooltip
                label="ログアウト"
                position="right"
                transitionDuration={0}
              >
                <UnstyledButton
                  onClick={handleSignOut}
                  className={cx(classes.link)}
                >
                  <AiFillStop />
                </UnstyledButton>
              </Tooltip>
            </>
          )}
        </Navbar.Section>
      </Navbar>
    </>
  );
};
