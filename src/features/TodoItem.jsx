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

    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-8">
        
      <label htmlFor={`check-item-${id}`} className="relative">
            <input
              type="checkbox"
              id={`check-item-${id}`}
              onChange={(e) => handleCheckItem(id, e.target.checked)}
              checked={completed}
              className="sr-only peer"
              />
            <div className="w-6 h-6 border-2 border-malibu-950 rounded-full peer-checked:bg-malibu-500 peer-checked:border-malibu-500 transition-all duration-200 ease-in-out"></div>
            <svg
              className="absolute w-4 h-4 text-malibu-100 top-1 left-1 pointer-events-none hidden peer-checked:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </label>
      
     <Star onStarItem={handleStarItem} id={id} important={important}/>

      </div>
     <button
          onClick={() => handleDeleteItem(id)}
          className="
           bg-malibu-950 rounded-lg
          flex-center p-2
          text-cerise-red-500 hover:text-cerise-red-700 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>

      </div>
     
       <p
       contentEditable={editable}
       onDoubleClick={()=>handleEditable(id)}
       onKeyDown={(e)=>handleConfirmEdit(e,id)}
       className={`mb-3 text-lg ${
          completed
            ? "text-malibu-950/50 line-through"
            : "text-malibu-950"
        } transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-2 py-1`}>{content}</p>
    
      <DatePicker
       showIcon
       showDisabledMonthNavigation
       closeOnScroll={true}
       minDate={time}
       startDate={time}
       endDate="null"
       dateFormat="yyyy/MM/dd" 
       selected={deadline}
       onChange={(date) => handleDeadline(id, date)} 
       placeholderText="set a deadline"
       className="mx-8 bg-malibu-700 text-malibu-100 border border-malibu-100/60 rounded-md focus:outline-none focus:ring-1 focus:ring-malibu-300 focus:border-transparent"
    
      />
      </li>
}