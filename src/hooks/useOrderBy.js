import { useState, useEffect, useCallback } from 'react';

export function useOrderBy(setTodos) {
  const [orderBy, setOrderBy] = useState(() => {
    const orderByData = localStorage.getItem("orderBy");
    if (!orderByData) return "default";
    return JSON.parse(orderByData);
  });

  useEffect(() => {
    localStorage.setItem('orderBy', JSON.stringify(orderBy));
  }, [orderBy]);

  const sortTodos = useCallback(() => {
    setTodos(curTodos => {
      const newTodos = [...curTodos];
      if (orderBy === "default")
        newTodos.sort((a, b) => a.time - b.time);
      else if (orderBy === "reversed")
        newTodos.reverse();
      else if (orderBy === "byDeadline")
        newTodos.sort((a, b) => {
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return a.deadline.getTime() - b.deadline.getTime();
        });
      else if (orderBy === "byCompleted")
        newTodos.sort((a, b) => {
          if (a.completed === b.completed) return 0;
          return a.completed ? 1 : -1;
        });
      else if (orderBy === "byImportance")
        newTodos.sort((a, b) => {
          if (a.important === b.important) return 0;
          return a.important ? -1 : 1;
        });
      return newTodos;
    });
  }, [orderBy, setTodos]);

  return { orderBy, setOrderBy, sortTodos };
}

