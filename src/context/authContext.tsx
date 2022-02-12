import React, { useEffect, useState } from "react"
import { createContext } from "react"
import { useMutation } from "react-query"
import { postLoginAPI } from "../api"

interface AuthContextType {
  isLogin: boolean
  onSubmitLogin: (userId: string, password: string) => void
}

export const loginContext = createContext({
  isLogin: false,
  onSubmitLogin: (userId: string, password: string) => {},
})

export const AuthContext: React.FC = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false)

  // 로그인 뮤테이션
  const loginMutation = useMutation(postLoginAPI, {
    onSuccess: (data) => {
      console.log(data, "login")
      setIsLogin(true)

      localStorage.setItem("isLogin", "loginTrue")
    },
    onError: (err) => {
      console.log(err, "loginError")
    },
  })

  useEffect(() => {
    const getToken = localStorage.getItem("isLogin")

    if (getToken) {
    }
  }, [])

  const onSubmitLogin = (userId: string, password: string): any => {
    loginMutation.mutate({
      userId,
      password,
    })
  }

  const todoContextValue: AuthContextType = {
    isLogin: isLogin,
    onSubmitLogin: onSubmitLogin,
  }

  return (
    <loginContext.Provider value={todoContextValue}>
      {children}
    </loginContext.Provider>
  )
}
