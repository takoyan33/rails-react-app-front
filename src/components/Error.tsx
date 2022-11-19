import React from "react";
import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

const Error = () => {
  const { classes } = useStyles();

  return (
    <>
      {/* <Header /> */}
      <div className="m-10">
        <Container className={classes.root}>
          <div className={classes.label}>404</div>
          <Title className={classes.title}>ページが見つかりませんでした</Title>
          <Text
            color="dimmed"
            size="lg"
            align="center"
            className={classes.description}
          >
            不具合があれば運営にお問合せください
          </Text>
          <Group position="center">
            <Link to="/">トップページに戻る</Link>
          </Group>
        </Container>
      </div>
    </>
  );
};
export default Error;
