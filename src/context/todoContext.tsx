import { CircularProgress } from "@mui/material"
import React, { createContext, useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { queryClient } from ".."
import { addTodoAPI, deleteAPI, getApi, patchTextAPI } from "../api"
import { EditText } from "../type"

interface TodoCtx {
  todoList: []
  onAddTodo: (contents: string) => void
  onEditTodo: ({ id: number, contents: string }: EditText) => void
  onDeleteTodo: (id: number) => void
  onLoading: any
  onError: any
}

export const todoContext = createContext({
  todoList: [],
  onAddTodo: (contents: string) => {},
  onEditTodo: ({ id, contents }: EditText) => {},
  onDeleteTodo: (id: number) => {},
  onLoading: null,
  onError: null,
})

export const TodoContext: React.FC = ({ children }) => {
  const [todoList, setTodoList] = useState<any>([])

  // 리스트 불러오기 get
  const { data, isLoading, isError } = useQuery("getTodo", getApi)

  const addTodoMutation = useMutation(addTodoAPI, {
    onSuccess: (data) => {
      setTodoList(todoList.concat(data?.data))

      queryClient.invalidateQueries("todo")
      // <Alert severity="success">추가 성공류</Alert>
    },
    onError: (err) => {
      // ;<Alert severity="error">추가 에러</Alert>
    },
  })

  // 글쓰기
  const onAddTodo = (contents: string): void => {
    if (contents.trim().length < 0) {
      return window.alert("투두를 입력하세요")
    }

    addTodoMutation.mutate(contents)
  }

  // 수정
  const patchTodoMutation = useMutation(patchTextAPI, {
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries("getTodo")
    },
    onError: (err) => {
      console.log(err, "err")
    },
  })

  const onEditTodo = ({ id, contents }: EditText): void => {
    if (contents.trim().length < 0) {
      return window.alert("수정값을 입력해주세요")
    }

    patchTodoMutation.mutate({ id, contents })
  }

  //삭제
  const deleteTodoMutation = useMutation(deleteAPI, {
    onSuccess: (data, variables) => {
      setTodoList((prev: EditText[]) => {
        return prev.filter((e: any) => e.id !== variables)
      })
      queryClient.invalidateQueries("getTodo")
    },

    onError: (err) => {
      console.log(err, "err")
    },
  })

  const onDeleteTodo = (id: number): void => {
    deleteTodoMutation.mutate(id)
  }

  useEffect(() => {
    setTodoList(data?.data)
  }, [data?.data])

  console.log(todoList)

  const onLoading = isLoading && <CircularProgress />
  const onError = isError && <div>Error입니다</div>

  const todoContextValue: TodoCtx = {
    todoList: todoList,
    onAddTodo: onAddTodo,
    onEditTodo: onEditTodo,
    onDeleteTodo: onDeleteTodo,
    onLoading: onLoading,
    onError: onError,
  }

  return (
    <todoContext.Provider value={todoContextValue}>
      {children}
    </todoContext.Provider>
  )
}
