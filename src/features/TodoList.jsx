import { useEffect } from "react";
import TodoItem from "./TodoItem";

export default function TodoList({todos,setTodos}){
     useEffect(()=>{
          localStorage.setItem("todos",JSON.stringify(todos))
          
        },[todos])

     return <ul className="form-list flex flex-1 flex-col items-center px-5 py-3 gap-3  w-full bg-malibu-100 rounded-md snap-mandatory snap-y overflow-x-hidden overflow-y-auto scrollbar-hidden" >
    {todos?.map((todo,index)=><TodoItem key={todo.id} {...todo} setTodos={setTodos} todos={todos} index={index}/>)}
     </ul>
}