import React from "react"
import "./App.css"
import { AuthContext } from "./context/authContext"
import { TodoContext } from "./context/todoContext"
import Layout from "./router/Layout"

const App: React.FC = () => {
  return (
    <TodoContext>
      <AuthContext>
        <Layout />
      </AuthContext>
    </TodoContext>
  )
}

export default App
