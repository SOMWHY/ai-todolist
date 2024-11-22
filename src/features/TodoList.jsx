import { useEffect } from "react";
import TodoItem from "./TodoItem";

export default function TodoList({todos,setTodos}){
     useEffect(()=>{
          localStorage.setItem("todos",JSON.stringify(todos))
          
        },[todos])

     return <ul className="form-list">
    {todos?.map((todo,index)=><TodoItem key={todo.id} {...todo} setTodos={setTodos} todos={todos} index={index}/>)}
     </ul>
}