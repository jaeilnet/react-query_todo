import React, { ChangeEvent, useContext } from "react"
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material"
import { EditText } from "../type"
import { todoContext } from "../context/todoContext"
import confirm from "antd/lib/modal/confirm"

interface TodoListProps {}

const TodoList: React.FC<TodoListProps> = () => {
  const todoCtx = useContext(todoContext)

  const showDeleteConfirm = (todoId: number): void => {
    // 삭제 api

    confirm({
      title: "Todo 삭제",
      content: "투두를 삭제 하시겠습니까",
      okText: "삭제",
      okType: "danger",
      cancelText: "아니요",
      onOk() {
        todoCtx.onDeleteTodo(todoId)
      },
      onCancel() {},
    })
  }

  const showEditconfirm = (
    e: React.MouseEvent,
    id: string,
    contents: string
  ): void => {
    let edit: EditText = {
      id,
      contents,
    }
    const onChangeEditText = (e: ChangeEvent<HTMLInputElement>): void => {
      edit = {
        id,
        contents: e.target.value,
      }
    }

    const editContent = (
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item>
          <span>Todo :</span>
        </Grid>
        <Grid item>
          <TextField
            variant="standard"
            placeholder={contents}
            defaultValue={contents}
            type="text"
            onChange={onChangeEditText}
          />
        </Grid>

        <Grid item>
          {/* {status ? ( */}
          {/* <Checkbox checked disabled>
            완료
          </Checkbox> */}
        </Grid>
      </Grid>
    )

    confirm({
      title: "Todo 수정",
      content: editContent,
      okText: "수정",
      okType: "primary",
      cancelText: "취소",
      onOk() {
        todoCtx.onEditTodo(edit)
      },
      onCancel() {},
    })
  }

  return (
    <>
      {todoCtx.onLoading}
      <List>
        {todoCtx.todoList
          ? todoCtx.todoList.map((todo: any) => (
              <ListItem key={todo.id}>
                <>
                  <ListItemText primary={todo.contents}></ListItemText>
                  <Button
                    variant="outlined"
                    style={{ margin: "0 5px" }}
                    onClick={(e: React.MouseEvent) =>
                      showEditconfirm(e, todo.id, todo.contents)
                    }
                  >
                    수정
                  </Button>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => showDeleteConfirm(todo.id)}
                  >
                    삭제
                  </Button>
                </>
              </ListItem>
            ))
          : null}
      </List>
    </>
  )
}

export default TodoList
