import { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swap from "../helpers/swap";
import Star from "../ui/Star";
export default function TodoItem({id,completed,editable,content,time,deadline,important,setTodos,todos,index}){
  const todoDragged=useRef(0)
  const todoDraggedOver=useRef(0)

  function handleConfirmEdit(e,id){

    if(e.key=="Enter") 
      setTodos(curTodos=>curTodos.map(todo=>todo.id===id?{...todo,content:e.target.textContent,editable:false}:todo))
      
  }

  function handleDragToSort(){
    if(todoDragged.current!==0&&todoDraggedOver.current!==0){
    const todosClone=[...todos]
    swap(todosClone[todoDragged.current],todosClone[todoDraggedOver.current])
    setTodos(todosClone)
    }
    todoDragged.current=0
    todoDraggedOver.current=0
  }

  function handleStarItem(id,important){

    setTodos(curTodos=>curTodos.map(todo=>todo.id===id?{...todo,important}:todo))
  
  }

  function handleCheckItem(id,completed){

    setTodos(curTodos=>curTodos.map(todo=>todo.id===id?{...todo,completed}:todo))
  
  }
  function handleDeleteItem(id){
    setTodos(curTodos=>curTodos.filter(todo=>todo.id!==id))

  }

  
  function handleEditable(id){
    setTodos(curTodos=>curTodos.map(todo=>todo.id===id?{...todo,editable:true}:todo))
//dblclick to toggle editable
  }

  function handleDeadline(id, date){
    setTodos((curTodos) =>
      curTodos.map((todo) =>
        todo.id === id ? { ...todo, deadline: date } : todo
      )
    );
  }
    return <li 
    draggable
    onDragStart={()=>{todoDragged.current=index}}
    onDragEnter={()=>{todoDraggedOver.current=index}}
    onDragEnd={handleDragToSort}
    onDragOver={e=>e.preventDefault()}
    key={id}
    className="form-list-item">

      <div className="flex justify-evenly">
        
      <label htmlFor="check-item" className="inline-block bg-malibu-200 w-10 rounded-md h-10">
      <input type="checkbox" id="check-item" onChange={(e)=>handleCheckItem(id,e.target.checked)} checked={completed} className="invisible"/>
      </label>
      
     <Star onStarItem={handleStarItem} id={id} important={important}/>

      <label htmlFor="delete-item" className="inline-block  bg-cerise-red-600 rounded-xl text-center ">
      <input type="button" id="delete-item" onClick={()=>handleDeleteItem(id)}  className="invisible w-0"/>
      delete
      </label>
      </div>

     
       <p
       contentEditable={editable}
       onDoubleClick={()=>handleEditable(id)}
       onKeyDown={(e)=>handleConfirmEdit(e,id)}
       className={completed?"text-malibu-900/50 line-through ":undefined}>{content}</p>
    
      <DatePicker
       showIcon
       isClearable  
       showDisabledMonthNavigation
       closeOnScroll={true}
       minDate={time}
       startDate={time}
       endDate="null"
       dateFormat="yyyy/MM/dd" 
       selected={deadline}
       onChange={(date) => handleDeadline(id, date)} 
       placeholderText="set a deadline"
     
      />
      </li>
}