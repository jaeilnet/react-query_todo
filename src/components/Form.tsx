import { Button, Grid, TextField } from "@mui/material"
import React, { useState } from "react"
// import useTodo from "../csutom/useTodo"

interface FormProps {}

const Forms: React.FC = () => {
  const [todoText, setTodoText] = useState("")

  // const { addTodoMutation } = useTodo()

  const onTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value)
  }

  const onAddTodo = () => {
    if (todoText.trim().length <= 0) {
      return alert("todo 적어주세요")
    }
    // addTodoMutation.mutate(todoText)
  }

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
        <Button variant="outlined" fullWidth onClick={onAddTodo}>
          투두 등록
        </Button>
      </Grid>
    </Grid>
  )
}

export default Forms
