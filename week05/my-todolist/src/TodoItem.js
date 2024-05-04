import React, { useCallback } from "react";

function TodoItem({ todoThis, todoList, setTodoList }) {
  const deleteTodo = useCallback(() => {
    setTodoList(todoList.filter((todoItem) => todoItem.id !== todoThis.id));
  }, [todoThis.id, todoList, setTodoList]);

  const editTodo = useCallback(() => {
    // 수정 구현
    const newText = prompt("새로운 내용을 입력하세요", todoThis.text);
    if (newText !== null) {
      setTodoList(
        todoList.map((todoItem) =>
          todoItem.id === todoThis.id
            ? { ...todoItem, text: newText }
            : todoItem
        )
      );
    }
  }, [todoThis.id, todoThis.text, todoList, setTodoList]);

  //완료된 것 아래쪽으로 옮기기
  const moveCheckedToEnd = useCallback(() => {
    const checkedTodos = todoList.filter((todoThis) => todoThis.done);
    const uncheckedTodos = todoList.filter((todoThis) => !todoThis.done);
    const sortedTodos = [...uncheckedTodos, ...checkedTodos];
    setTodoList(sortedTodos);
  }, [todoList, setTodoList]);

  const completeTodo = useCallback(() => {
    const completeEditedList = todoList.map((todoItem) => {
      return todoItem.id === todoThis.id
        ? { ...todoThis, done: !todoThis.done }
        : todoItem;
    });
    moveCheckedToEnd(completeEditedList);
  }, [todoThis, todoList, moveCheckedToEnd]);

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        className="checkbox"
        checked={todoThis.done}
        onChange={completeTodo}
      />
      <span>{todoThis.text}</span>
      <div style={{ float: "right" }}>
        <input
          type="button"
          className="editBtn"
          value="수정"
          onClick={editTodo}
        />
        <input
          type="button"
          className="deleteBtn"
          value="삭제"
          onClick={deleteTodo}
        />
      </div>
    </li>
  );
}

export default React.memo(TodoItem);
