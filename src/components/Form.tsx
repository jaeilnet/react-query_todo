import { Button, Grid, TextField } from "@mui/material"
import React, { useContext, useState } from "react"
import { todoContext } from "../context/todoContext"
// import useTodo from "../csutom/useTodo"

const Forms: React.FC = () => {
  const [todoText, setTodoText] = useState("")

  const onTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value)
  }

  const todoCtx = useContext(todoContext)

  return (
    <Grid justifyContent="space-between" container>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="text"
          placeholder="Todo"
          value={todoText}
          onChange={onTodoText}
          variant="standard"
        />
        <Button
          variant="outlined"
          fullWidth
          onClick={() => todoCtx.onAddTodo(todoText)}
        >
          투두 등록
        </Button>
      </Grid>
    </Grid>
  )
}

export default Forms
