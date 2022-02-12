import React, { createContext } from "react"

interface TodoCtx {
  todoList: []
}

export const todoCtx = createContext({
  todoList: [],
})

export const TodoContext: React.FC = ({ children }) => {
  const todoContext: TodoCtx = {
    todoList: [],
  }

  return <todoCtx.Provider value={todoContext}>{children}</todoCtx.Provider>
}
