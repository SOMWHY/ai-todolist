import { useEffect, useState } from "react"

export default function Operations({setTodos}){

  const [orderBy,setOrderBy]=useState(()=>{
    const orderByData=localStorage.getItem("orderBy")
    if(orderByData==null)return "default"
    return JSON.parse(orderByData)
  })

  useEffect(()=>{
    localStorage.setItem('orderBy',JSON.stringify(orderBy))  
  },[orderBy])

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
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return a.deadline - b.deadline;
        }))
      
  }

    return <div className="form-operations">
    <label htmlFor="clear-allItems" className="inline-block bg-red-700 ">
    <input type="button" id="clear-allItems" value="CLEAR" onClick={handleClearItems}/>
    </label>
    
    <select title="orderBy-allItems"
    value={orderBy}
    onChange={handleOrderBy}>
      <option value="default">Default</option>
      <option value="reversed">Reversed</option>
      <option value="byDeadline">ByDeadline</option>
    </select>
   
   
  </div>
}