import { Fragment } from "react";
import DropArea from "../ui/DropArea"
import TodoItem from "./TodoItem"

export default function TodoList({ todos, setTodos }) {
  return (
    <ul className="form-list flex flex-1 flex-col items-center px-5 py-3 gap-3 w-full bg-malibu-200/80 dark:bg-malibu-950 rounded-md snap-mandatory snap-y overflow-x-hidden overflow-y-auto scrollbar-hidden">
      <DropArea todos={todos} setTodos={setTodos} />
      {todos?.map((todo, index) => (
        <Fragment key={todo.id}>
          <TodoItem {...todo} setTodos={setTodos} todos={todos} />
          <DropArea index={index + 1} todos={todos} setTodos={setTodos} />
        </Fragment>
      ))}
    </ul>
  );
}
