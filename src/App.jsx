import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function App(){

  const [darkmode,setDarkmode]=useState(()=>{
    const darkmodeData=localStorage.getItem("darkmode")
    if(darkmodeData==null)return false
    return JSON.parse(darkmodeData)
  })
  

  const [newItem,setNewItem]=useState("")
  const [orderBy,setOrderBy]=useState(()=>{
    const orderByData=localStorage.getItem("orderBy")
    if(orderByData==null)return "default"
    return JSON.parse(orderByData)
  })
  const [todos,setTodos]=useState(()=>{
    const todosData=localStorage.getItem("todos")
    if(todosData==null)return []
    return JSON.parse(todosData).map(todo => ({
      ...todo,
      deadline: todo.deadline ? new Date(todo.deadline) : null
    }))
  })
  

  const newItemInputRef=useRef()
 

  //refocus when rerendering
  useEffect(()=>{
   newItemInputRef.current.focus() 
  })

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
    
  },[todos])

  
  useEffect(()=>{
    localStorage.setItem('orderBy',JSON.stringify(orderBy))  
  },[orderBy])
  
  useEffect(()=>{
  localStorage.setItem('darkmode',JSON.stringify(darkmode))  
  },[darkmode])




  function handleSetEditable(id){
    setTodos(curTodos=>curTodos.map(todo=>todo.id===id?{...todo,editable: !todo.editable}:todo))
//dblclick to ensure editable
  }

  function handleAddItem(){
    setTodos(curTodos=>[...curTodos,{
      id:crypto.randomUUID(),
      completed:false,
      content:newItem,  
      deadline:null,
      time:Date.now(),
      editable:false,
    }])
    setNewItem("")
  }

  function handleCheckItem(id,completed){

    setTodos(curTodos=>curTodos.map(todo=>todo.id===id?{...todo,completed}:todo))
  
  }
  function handleDeleteItem(id){
    setTodos(curTodos=>curTodos.filter(todo=>todo.id!==id))

  }

  function handleClearItems(){
    setTodos([])
  }

  function handleOrderBy(e){
    setOrderBy(e.target.value)

  
    if(e.target.value==="default")
      
      setTodos(curTodos=>[...curTodos].sort((a, b) => {
    
        return a.time - b.time //（早的排前面）
      }))
      if(e.target.value==="reversed")
        setTodos(curTodos=>[...curTodos].reverse())
      
      if(e.target.value==="byDeadline")
        setTodos(curTodos=>[...curTodos].sort((a,b)=>{
      console.log(Date(a.deadline))
      console.log(Date(b.deadline))
          return Date(a.deadline)-Date(b.deadline)
        }))
      
  }

  // function handleEditContent(id){
    

  // }

  function handleSubmit(e){
    e.preventDefault()
    //if content not change,then return
    //otherwise handleEditContent
    if(!newItem) return
    handleAddItem()


  }


  return <form className={darkmode&&"dark "+"form bg-slate-300 dark:bg-slate-800 dark:text-slate-300"} onSubmit={handleSubmit}>
    <header className="form-header">
      <label htmlFor="add-newItem">Todos</label>
      <input type="text" 
      placeholder="ADD NEW TODO HERE~"
      id="add-newItem"
      ref={newItemInputRef}
      value={newItem}
      onChange={(e)=>setNewItem(e.target.value)}/>
      <label className="inline-block bg-indigo-300"><input type="button" value="DarkmodeToggle" onClick={()=>setDarkmode(darkmode=>!darkmode)}/></label>
    </header>
    <div className="form-operations">
      <label htmlFor="clear-allItems" className="inline-block bg-red-700 ">
      <input type="button" id="clear-allItems" value="CLEAR" onClick={handleClearItems}/>
      </label>
      
      <select name="orderBy-allItems"
      value={orderBy}
      onChange={handleOrderBy}>
        <option value="default">Default</option>
        <option value="reversed">Reversed</option>
        <option value="byDeadline">ByDeadline</option>
      </select>
     
     
    </div>
    <ul className="form-list">

      {todos?.map(todo=>{return <li 
      
      key={todo.id}
      className="form-list-item text-wrap">
        <label htmlFor="check-item" >
        <input type="checkbox" onChange={(e)=>handleCheckItem(todo.id,e.target.checked)} checked={todo.completed}/>
        </label>
         <p
         contentEditable={todo.editable}
         onDoubleClick={()=>handleSetEditable(todo.id)}
         className={todo.completed?"text-gray-800/50 line-through":undefined}>{todo.content}</p>
        <label htmlFor="delete-item" className="inline-block  bg-red-600">
        <input type="button" onClick={()=>handleDeleteItem(todo.id)} value="delete"/>
        </label>
       
        <DatePicker
         showIcon
         isClearable  
         showDisabledMonthNavigation
         closeOnScroll={true}
         minDate={todo.time}
         startDate={todo.time}
         endDate="null"
         dateFormat="yyyy/MM/dd" 
         selected={todo.deadline}
        //  onChange={} 
         placeholderText="set a deadline"
        />
        </li>
      } )}
    </ul>
  </form>



  
}