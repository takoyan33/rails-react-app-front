import { PageHeader } from "antd";
import "antd/dist/antd.css";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
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
} from "react-icons/ai";

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
  { icon: <AiFillHome />, label: "TOP", href: "/" },
  { icon: <AiFillEdit />, label: "メンバー登録", href: "/member/new" },
  { icon: <AiFillFile />, label: "ニュース", href: "/todos" },
  { icon: <AiFillQuestionCircle />, label: "About", href: "/about" },
  { icon: <AiFillInfoCircle />, label: "サークルについて", href: "/club" },
  // { label: "Security" },
  // { label: "Settings" },
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
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index, icon) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <>
      <Navbar height={1200} width={{ base: 80 }} p="md">
        <Navbar.Section grow mt={50}>
          <Stack justify="center" spacing={0}>
            {links}
          </Stack>
        </Navbar.Section>
      </Navbar>
    </>
  );
};
