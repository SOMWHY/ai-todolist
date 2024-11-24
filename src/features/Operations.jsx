import { useCallback, useEffect, useState } from "react"
import Button from "../ui/Button"
import { Select } from "../ui/Select"
export default function Operations({setTodos}){
  const [modalIsOpen,setModalIsOpen]=useState(false)
  const [orderBy,setOrderBy]=useState(()=>{
    const orderByData=localStorage.getItem("orderBy")
    if(!orderByData)return "default"
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
  },[])
  
  
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

    <div className="modal-content 
    relative
    w-[60%] h-[fit-content] bg-malibu-200 rounded-lg p-3
    flex flex-col gap-6  z-[99]">
      <header>

      <h1 className="text-cerise-red-700 font-extrabold">Warning</h1>
      <button onClick={()=>setModalIsOpen(false)}
        className="absolute top-3 right-3 rounded-full bg-malibu-500 w-8 h-8 text-malibu-100 text-4xl font-semibold flex-center">&times;</button>
      </header>
      <main className="text-malibu-950 tracking-wide">
        <p>Are you sure to clear all todos?</p>
      </main>
      <footer className="flex justify-evenly text-malibu-950 font-semibold">
        <Button  onClick={handleClearItems} className="rounded-xl bg-malibu-300 hover:bg-cerise-red-600 hover:text-cerise-red-200">confirm</Button>
        <Button onClick={()=>setModalIsOpen(false)} className="rounded-xl bg-malibu-300/60 hover:bg-malibu-500">cancel</Button>
      </footer>
    </div>
    </div>}
  
    <div className="flex-center gap-3 rounded-md bg-malibu-200 w-full h-[15%] p-3">
   
    <Button 
    onClick={()=>setModalIsOpen(true)}
    mode="clear" className="text-malibu-300 w-[15%] h-[80%] max-w-24 rounded-2xl bg-cerise-red-700"/>
    <Select name="orderBy" 
        className="bg-malibu-100 text-xl
        text-malibu-950
        font-medium ml-6 
        hover:bg-malibu-300"
        value={orderBy}
        onChange={handleOrderBy}>
      <option value="default">Default</option>
      <option value="reversed">Reversed</option>
      <option value="byDeadline">ByDeadline</option>
      <option value="byCompleted">ByCompleted</option>
      <option value="byImportance">ByImportance</option>
    </Select>
   
  </div>
      </>
}