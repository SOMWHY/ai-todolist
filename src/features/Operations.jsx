import { useCallback, useEffect, useState } from "react"

export default function Operations({setTodos}){
  const [modalIsOpen,setModalIsOpen]=useState(false)
  const [orderBy,setOrderBy]=useState(()=>{
    const orderByData=localStorage.getItem("orderBy")
    if(orderByData==null)return "default"
    return JSON.parse(orderByData)
  })
  const sortTodos=useCallback(()=>{
    if(orderBy==="default")

      setTodos(curTodos=>[...curTodos].sort((a, b) => {
    
        return a.time - b.time //（早的排前面）
      }))
      if(orderBy==="reversed")
        setTodos(curTodos=>[...curTodos].reverse())
      
      if(orderBy==="byDeadline")
        setTodos(curTodos=>[...curTodos].sort((a,b)=>{
          if (!a.deadline) return 1
          if (!b.deadline) return -1
          return a.deadline - b.deadline
        }))
      
      if(orderBy==="byCompleted")
        setTodos(curTodos=>[...curTodos].sort((a,b)=>{
          if(a.completed===b.completed) return 0
          return a.completed?1:-1
        }))

      if(orderBy==="byImportance")
          setTodos(curTodos=>[...curTodos].sort((a,b)=>{
            if(a.important===b.important) return 0
            return a.important?-1:1
          }))
  },[orderBy,setTodos])
  
  
  useEffect(()=>{
    localStorage.setItem('orderBy',JSON.stringify(orderBy))  
  },[orderBy])
  

  useEffect(()=>{
    sortTodos()
    console.log("useeffect")
  },[sortTodos])
  
  function handleClearItems(){
    setModalIsOpen(false)
    setTodos([])
  }


  function handleOrderBy(e){
    setOrderBy(e.target.value)
  }

    return <>
    {modalIsOpen&&  

    <div 
    onClick={(e)=>{if(e.target.className==="overlay")setModalIsOpen(false)}}
    className="overlay">

    <div className="modal-content w-[60%] h-[70%] bg-slate-100 z-[99]">
      <header>

      <h1>Warning</h1>
      <button onClick={()=>setModalIsOpen(false)}>&times;</button>
      </header>
      <main>
        <p>Are you sure to clear all todos?</p>
      </main>
      <footer>
        <button name="confirm" onClick={handleClearItems}>confirm</button>
        <button name="cancel" onClick={()=>setModalIsOpen(false)}>cancel</button>
      </footer>
    </div>
    </div>}
  
    <div className="form-operations">
    <label htmlFor="clear-allItems" className="inline-block bg-red-700 ">
    <input type="button" id="clear-allItems" value="CLEAR" onClick={()=>setModalIsOpen(true)}/>
    </label>
    
    <select title="orderBy-allItems"
    value={orderBy}
    onChange={handleOrderBy} className="text-center">
      <option value="default">Default</option>
      <option value="reversed">Reversed</option>
      <option value="byDeadline">ByDeadline</option>
      <option value="byCompleted">ByCompleted</option>
      <option value="byImportance">ByImportance</option>
    </select>
   
   
  </div>
      </>
}