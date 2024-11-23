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
    if(todosData==null)return [{
      id:"093a1b46-09a1-49f8-a1f4-490ddc549e61", 
      completed: false, 
      content: "making bread",      deadline:"2024-11-22T15:14:22.584Z",
      editable: false,
      time:1732288462584},
      {
        id:"093a1b46-09a1-49f8-a1y4-490ddc549e61", 
        completed: false, 
        content: "swap",      deadline:"2024-11-24T15:14:22.584Z",
        editable: false,
        time:1732288462586},
        {
          id:"093a1b46-19a1-45f8-a1f4-490ddc549e61", 
          completed: false, 
          content: "making love",      deadline:"2024-11-23T15:14:22.584Z",
          editable: false,
          time:1732288462588}]
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
      deadline:new Date(),
      time:Date.now(),
      editable:false,
      important:false,
    }])
    setNewItem("")
  }


  function handleSubmit(e){
    console.log("submit")
    e.preventDefault()
    //if content not change,then return
    //otherwise handleEditContent
    if(!newItem) return
    handleAddItem()


  }


  return <form 
  
  className={darkmode&&"dark "+" flex flex-col items-center w-full max-w-[1000px] h-screen rounded-sm px-1 py-1 gap-1 absolute left-[50%] -translate-x-[50%]"} onSubmit={handleSubmit}>
    <Header newItemInputRef={newItemInputRef} newItem={newItem} setNewItem={setNewItem} setDarkmode={setDarkmode}/>
    <Operations setTodos={setTodos} todos={todos}/>
    <TodoList todos={todos} setTodos={setTodos}/>
  </form>



  
}