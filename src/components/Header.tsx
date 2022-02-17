import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { loginContext } from "../context/authContext";

interface HeaderProps {
  isLogin?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLogin }) => {
  const history = useHistory();

  const loginCtx = useContext(loginContext);
  // 로그아웃 함수

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      style={{ backgroundColor: "rgb(227 227 227)" }}
    >
      <h1>Todo List</h1>
      <Grid item>
        <h3 style={{ margin: "0 10px" }}>
          {loginCtx.isLogin && loginCtx.userId ? loginCtx.userId : "비로그인"}님
        </h3>
        {loginCtx.isLogin ? (
          <Button fullWidth color="secondary" onClick={loginCtx.onLogout}>
            로그아웃
          </Button>
        ) : (
          <Button fullWidth onClick={() => history.push("/login")}>
            로그인
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default Header;
