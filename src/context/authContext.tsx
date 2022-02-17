import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useMutation } from "react-query";
import { loginCheckAPI, postLoginAPI } from "../api";

interface AuthContextType {
  isLogin: boolean;
  userId: string;
  onSubmitLogin: (userId: string, password: string) => void;
  onLogout: () => void;
}

export const loginContext = createContext({
  isLogin: false,
  userId: "",
  onSubmitLogin: (userId: string, password: string) => {},
  onLogout: () => {},
});

export const AuthContext: React.FC = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  // 로그인 뮤테이션
  const loginMutation = useMutation(postLoginAPI, {
    onSuccess: (data) => {
      setIsLogin(true);
      setUserId(data.data.userId);

      localStorage.setItem("isLogin", "loginTrue");
    },
    onError: (err) => {
      console.log(err, "loginError");
    },
  });

  // 로그인 체크
  const loginCheckMutation = useMutation(loginCheckAPI, {
    onSuccess: (data) => {
      setUserId("jaeil");
    },
    onError: (err) => {
      console.log(err, "로그인 체크에러");
    },
  });

  const onSubmitLogin = (userId: string, password: string): any => {
    loginMutation.mutate({
      userId,
      password,
    });
  };

  const onLogout = () => {
    if (!isLogin) {
      return;
    }
    localStorage.removeItem("isLogin");

    setIsLogin(false);
  };

  useEffect(() => {
    const getToken = localStorage.getItem("isLogin");

    if (getToken) {
      setIsLogin(true);
      loginCheckMutation.mutate(getToken);
    }
  }, []);

  const todoContextValue: AuthContextType = {
    isLogin: isLogin,
    userId: userId,
    onSubmitLogin: onSubmitLogin,
    onLogout: onLogout,
  };

  return (
    <loginContext.Provider value={todoContextValue}>
      {children}
    </loginContext.Provider>
  );
};
