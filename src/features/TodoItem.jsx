import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function TodoItem({id,completed,editable,content,time,deadline,setTodos}){
  function handleCheckItem(id,completed){

    setTodos(curTodos=>curTodos.map(todo=>todo.id===id?{...todo,completed}:todo))
  
  }
  function handleDeleteItem(id){
    setTodos(curTodos=>curTodos.filter(todo=>todo.id!==id))

  }

  
  function handleEditable(id){
    setTodos(curTodos=>curTodos.map(todo=>todo.id===id?{...todo,editable: !todo.editable}:todo))
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
    
    key={id}
    className="form-list-item text-wrap">
      <label htmlFor="check-item" >
      <input type="checkbox" onChange={(e)=>handleCheckItem(id,e.target.checked)} checked={completed}/>
      </label>
       <p
       contentEditable={editable}
       onDoubleClick={()=>handleEditable(id)}
       className={completed?"text-gray-800/50 line-through":undefined}>{content}</p>
      <label htmlFor="delete-item" className="inline-block  bg-red-600">
      <input type="button" onClick={()=>handleDeleteItem(id)} value="delete"/>
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