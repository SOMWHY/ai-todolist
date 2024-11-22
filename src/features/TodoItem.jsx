import { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swap from "../helpers/swap";
export default function TodoItem({id,completed,editable,content,time,deadline,setTodos,todos,index}){
  const todoDragged=useRef(0)
  const todoDraggedOver=useRef(0)

  function handleDragToSort(){
    if(todoDragged.current!==0&&todoDraggedOver.current!==0){
    const todosClone=[...todos]
    swap(todosClone[todoDragged.current],todosClone[todoDraggedOver.current])
    setTodos(todosClone)
    }
    todoDragged.current=0
    todoDraggedOver.current=0
  }

  function handleCheckItem(id,completed){

    setTodos(curTodos=>curTodos.map(todo=>todo.id===id?{...todo,completed}:todo))
  
  }
  function handleDeleteItem(id){
    setTodos(curTodos=>curTodos.filter(todo=>todo.id!==id))

  }

  
//   function handleEditable(id){
//     setTodos(curTodos=>curTodos.map(todo=>todo.id===id?{...todo,editable: !todo.editable}:todo))
// //dblclick to toggle editable
//   }

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
    className="form-list-item text-wrap cursor-move">
      <label htmlFor="check-item" >
      <input type="checkbox" id="check-item" onChange={(e)=>handleCheckItem(id,e.target.checked)} checked={completed}/>
      </label>
       <p
       contentEditable={editable}
      //  onDoubleClick={()=>handleEditable(id)}
       className={completed?"text-gray-800/50 line-through":undefined}>{content}</p>
      <label htmlFor="delete-item" className="inline-block  bg-red-600">
      <input type="button" id="delete-item" onClick={()=>handleDeleteItem(id)} value="delete"/>
      </label>
     
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