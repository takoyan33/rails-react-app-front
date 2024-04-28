import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { signOut } from "../lib/api/auth";
// import { AuthContext } from "../Routes";
import { useState, useEffect, createContext } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
  },
  linkBtn: {
    textTransform: "none",
  },
}));

const NewHeader: React.FC = () => {
  // const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const classes = useStyles();
  const histroy = useNavigate();

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut();
      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");
        // setIsSignedIn(false);
        histroy("/signin");
        console.log("Succeeded in sign out");
      } else {
        console.log("Failed in sign out");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [hasCookies, setHasCookies] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("_access_token");
    if (accessToken) {
      setHasCookies(true);
    }
  }, []);

  const AuthButtons = () => {
    if (hasCookies) {
      return (
        <Button
          color="inherit"
          className={classes.linkBtn}
          onClick={handleSignOut}
        >
          ログアウト
        </Button>
      );
    } else {
      return (
        <>
          <Button
            component={Link}
            to="/signin"
            color="inherit"
            className={classes.linkBtn}
          >
            サインイン
          </Button>
          <Button
            component={Link}
            to="/signup"
            color="inherit"
            className={classes.linkBtn}
          >
            新規登録
          </Button>
        </>
      );
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.iconButton}
            color="inherit"
          ></IconButton>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
          >
            トップページ
          </Typography>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NewHeader;
