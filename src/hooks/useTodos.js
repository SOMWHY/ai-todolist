import { useState, useEffect } from 'react';

export function useTodos() {
  const [todos, setTodos] = useState(() => {
    const todosData = localStorage.getItem("todos");
    if (todosData == null) return [];
    return JSON.parse(todosData).map(todo => ({
      ...todo,
      deadline: todo.deadline ? new Date(todo.deadline) : null
    }));
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return { todos, setTodos };
}

