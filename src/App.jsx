import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

import Header from "./features/Header";
import Operations from "./features/Operations";
import TodoList from "./features/TodoList";

export default function App(){

  const [darkmode,setDarkmode]=useState(()=>{
    const darkmodeData=localStorage.getItem("darkmode")
    if(darkmodeData==null)return false
    return JSON.parse(darkmodeData)
  })
  

  const [todos,setTodos]=useState(()=>{
    const todosData=localStorage.getItem("todos")
    if(todosData==null)return []
    return JSON.parse(todosData).map(todo => ({
      ...todo,
      deadline: todo.deadline ? new Date(todo.deadline) : null
    }))
  })
  const [newItem,setNewItem]=useState("")

  const newItemInputRef=useRef()
  //refocus when rerendering
  useEffect(()=>{
   newItemInputRef.current.focus() 
  })

  
  useEffect(()=>{
  localStorage.setItem('darkmode',JSON.stringify(darkmode))  
  },[darkmode])


  function handleAddItem(){
    setTodos(curTodos=>[...curTodos,{
      id:crypto.randomUUID(),
      completed:false,
      content:newItem,  
      deadline:"2024-12-02",
      time:Date.now(),
      editable:false,
    }])
    setNewItem("")
  }


  function handleSubmit(e){
    e.preventDefault()
    //if content not change,then return
    //otherwise handleEditContent
    if(!newItem) return
    handleAddItem()


  }


  return <form className={darkmode&&"dark "+"form bg-slate-300 dark:bg-slate-800 dark:text-slate-300"} onSubmit={handleSubmit}>
    <Header newItemInputRef={newItemInputRef} newItem={newItem} setNewItem={setNewItem} setDarkmode={setDarkmode}/>
    <Operations setTodos={setTodos}/>
    <TodoList todos={todos} setTodos={setTodos}/>
  </form>



  
}